import { beforeEach, describe, expect, it, vi } from "vitest";
import { CREATED_AT, ID, createSqlMock, post } from "./helpers";

const { db, send } = vi.hoisted(() => ({
  db: {} as ReturnType<typeof createSqlMock>,
  send: vi.fn(),
}));

vi.mock("../functions/_shared/db", () => ({ sql: () => db.query }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import contact from "../functions/contact.mts";
import leadMagnet from "../functions/lead-magnet.mts";
import newsletter from "../functions/newsletter.mts";
import tutorApplication from "../functions/tutor-application.mts";

Object.assign(db, createSqlMock());

const sentTo = () => send.mock.calls.map(([params]) => params.to[0]);

beforeEach(() => {
  db.reset();
  send.mockReset();
  send.mockResolvedValue({ data: { id: "email_1" }, error: null });
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("SENDER_EMAIL", "hello@thetravellingtutorx.co.uk");
  vi.stubEnv("NOTIFICATION_EMAIL", "owner@example.com");
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

const contactBody = {
  name: "Amelia Rose",
  email: "Amelia@Example.com",
  role: "student",
  subject: "",
  message: "Hi <b>there</b>\nCan you help?",
};

describe("shared form handling", () => {
  it("rejects non-POST requests with 405", async () => {
    const res = await contact(new Request("https://example.test/api/contact"));
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
    expect(db.query).not.toHaveBeenCalled();
  });

  it("rejects a body that isn't JSON", async () => {
    const res = await contact(post("/api/contact", "not json"));
    expect(res.status).toBe(400);
  });

  it("returns field errors for invalid input", async () => {
    const res = await contact(post("/api/contact", { ...contactBody, email: "nope", role: "admin" }));
    expect(res.status).toBe(400);
    const { detail } = await res.json();
    expect(Object.keys(detail).sort()).toEqual(["email", "role"]);
    expect(db.query).not.toHaveBeenCalled();
  });

  it.each([
    ["contact", contact, contactBody],
    ["newsletter", newsletter, { email: "a@b.co" }],
    ["lead-magnet", leadMagnet, { first_name: "A", email: "a@b.co", audience: "student", magnet: "essay-super-structure-families" }],
    ["tutor-application", tutorApplication, { name: "A", email: "a@b.co", qualifications: "q", experience: "e", why_join: "w" }],
  ])("%s: a filled honeypot looks successful but saves and sends nothing", async (route, handler, body) => {
    const res = await handler(post(`/api/${route}`, { ...body, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.id).toEqual(expect.any(String));
    expect(json).not.toHaveProperty("website");
    expect(db.query).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("ignores an empty honeypot", async () => {
    db.willReturn([{ id: ID, ...contactBody, created_at: CREATED_AT }]);
    const res = await contact(post("/api/contact", { ...contactBody, website: "" }));
    expect(res.status).toBe(200);
    expect(db.query).toHaveBeenCalledOnce();
  });

  it("returns 500 when the database fails", async () => {
    db.query.mockRejectedValueOnce(new Error("connection refused"));
    const res = await contact(post("/api/contact", contactBody));
    expect(res.status).toBe(500);
    expect(send).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact", () => {
  it("saves the message, notifies the owner and returns the record", async () => {
    db.willReturn([{ id: ID, name: "Amelia Rose", email: "amelia@example.com", role: "student", subject: null, message: contactBody.message, created_at: CREATED_AT }]);

    const res = await contact(post("/api/contact", contactBody));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      id: ID,
      name: "Amelia Rose",
      email: "amelia@example.com",
      role: "student",
      subject: null,
      message: contactBody.message,
      created_at: "2026-09-16T10:00:00.000Z",
    });
    expect(db.calls[0]!.values).toEqual(["Amelia Rose", "amelia@example.com", "student", null, contactBody.message]);

    expect(send).toHaveBeenCalledOnce();
    const email = send.mock.calls[0]![0];
    expect(email.to).toEqual(["owner@example.com"]);
    expect(email.from).toBe("hello@thetravellingtutorx.co.uk");
    expect(email.replyTo).toBe("amelia@example.com");
    expect(email.subject).toBe("New enquiry from Amelia Rose (Student) — (no subject)");
    expect(email.html).toContain("Hi &lt;b&gt;there&lt;/b&gt;<br>Can you help?");
  });

  it("still succeeds when Resend throws", async () => {
    db.willReturn([{ id: ID, created_at: CREATED_AT }]);
    send.mockRejectedValueOnce(new Error("Resend is down"));
    const res = await contact(post("/api/contact", contactBody));
    expect(res.status).toBe(200);
  });

  it("still succeeds when Resend returns an error", async () => {
    db.willReturn([{ id: ID, created_at: CREATED_AT }]);
    send.mockResolvedValueOnce({ data: null, error: { message: "domain not verified" } });
    const res = await contact(post("/api/contact", contactBody));
    expect(res.status).toBe(200);
  });

  it("skips email when no API key is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    db.willReturn([{ id: ID, created_at: CREATED_AT }]);
    const res = await contact(post("/api/contact", contactBody));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });
});

describe("POST /api/newsletter", () => {
  it("saves a new subscriber with the default source and notifies the owner", async () => {
    db.willReturn([{ id: ID, email: "new@example.com", source: "footer", created_at: CREATED_AT }]);

    const res = await newsletter(post("/api/newsletter", { email: "New@Example.com" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ id: ID, email: "new@example.com", source: "footer" });
    expect(db.calls[0]!.values).toEqual(["new@example.com", "footer"]);
    expect(sentTo()).toEqual(["owner@example.com"]);
    expect(send.mock.calls[0]![0].subject).toBe("New newsletter signup: new@example.com");
  });

  it("returns the existing row for a repeat signup without notifying", async () => {
    db.willReturn([], [{ id: ID, email: "old@example.com", source: "footer", created_at: CREATED_AT }]);

    const res = await newsletter(post("/api/newsletter", { email: "old@example.com", source: "footer" }));

    expect(res.status).toBe(200);
    expect((await res.json()).id).toBe(ID);
    expect(db.calls).toHaveLength(2);
    expect(db.calls[1]!.text).toMatch(/^select \* from newsletter_subscribers where email = \?$/);
    expect(send).not.toHaveBeenCalled();
  });
});

describe("POST /api/lead-magnet", () => {
  const body = { first_name: "Jordan", email: "jordan@example.com", audience: "student", magnet: "essay-super-structure-families" };

  it("emails the download link to the visitor and notifies the owner", async () => {
    db.willReturn([{ id: ID, ...body, created_at: CREATED_AT }]);

    const res = await leadMagnet(post("/api/lead-magnet", body));

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ id: ID, ...body, created_at: "2026-09-16T10:00:00.000Z" });
    expect(sentTo().sort()).toEqual(["jordan@example.com", "owner@example.com"]);

    const download = send.mock.calls.find(([p]) => p.to[0] === "jordan@example.com")![0];
    expect(download.subject).toBe("Your free resource: Essay Super Structure: Families & Households (10m)");
    expect(download.html).toContain('href="https://example.test/resources/essay-super-structure-families.pdf"');
    expect(download.html).toContain("Hi Jordan");
    expect(download.replyTo).toBe("owner@example.com");
  });

  it.each(["parent-guide", "teacher-resources"])(
    "only notifies the owner while %s has no file",
    async (magnet) => {
      const audience = magnet === "parent-guide" ? "parent" : "teacher";
      db.willReturn([{ id: ID, ...body, audience, magnet, created_at: CREATED_AT }]);

      const res = await leadMagnet(post("/api/lead-magnet", { ...body, audience, magnet }));

      expect(res.status).toBe(200);
      expect(sentTo()).toEqual(["owner@example.com"]);
      expect(send.mock.calls[0]![0].html).toContain("haven&#x27;t been sent anything");
    },
  );

  it("rejects an unknown resource", async () => {
    const res = await leadMagnet(post("/api/lead-magnet", { ...body, magnet: "toString" }));
    expect(res.status).toBe(400);
    expect((await res.json()).detail).toHaveProperty("magnet");
    expect(db.query).not.toHaveBeenCalled();
  });
});

describe("POST /api/tutor-application", () => {
  const body = {
    name: "Marcus Brown",
    email: "marcus@example.com",
    phone: "",
    qualifications: "(Pending — submitted via deposit checkout)",
    experience: "(Pending — submitted via deposit checkout)",
    why_join: "Paying deposit for the 6-week Sociology Tutor Training Programme.",
  };

  it("saves the application with an empty phone as null and notifies the owner", async () => {
    db.willReturn([{ id: ID, ...body, phone: null, created_at: CREATED_AT }]);

    const res = await tutorApplication(post("/api/tutor-application", body));

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ id: ID, name: "Marcus Brown", phone: null });
    expect(db.calls[0]!.values[2]).toBeNull();
    expect(sentTo()).toEqual(["owner@example.com"]);
    const email = send.mock.calls[0]![0];
    expect(email.subject).toBe("New tutor partner application: Marcus Brown");
    expect(email.html).toContain("Stripe dashboard");
  });

  it("requires qualifications", async () => {
    const res = await tutorApplication(post("/api/tutor-application", { ...body, qualifications: "  " }));
    expect(res.status).toBe(400);
  });
});
