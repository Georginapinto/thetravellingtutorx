import type { z } from "zod";

// Name of the hidden input every form sends. People never see it; bots fill it in.
export const HONEYPOT_FIELD = "website";

export const json = (body: unknown, status = 200, headers?: HeadersInit): Response =>
  Response.json(body, { status, headers });

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

export const isHoneypotFilled = (body: unknown): boolean =>
  isObject(body) &&
  typeof body[HONEYPOT_FIELD] === "string" &&
  body[HONEYPOT_FIELD].trim() !== "";

/**
 * Wraps a POST form endpoint: method check, JSON parsing, the honeypot and
 * validation, so each function only handles a valid submission.
 */
export function formHandler<S extends z.ZodTypeAny>(
  schema: S,
  handle: (data: z.infer<S>, req: Request) => Promise<Response>,
) {
  return async (req: Request): Promise<Response> => {
    if (req.method !== "POST") {
      return json({ detail: "Method not allowed" }, 405, { Allow: "POST" });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ detail: "Request body must be JSON" }, 400);
    }

    if (isHoneypotFilled(body)) {
      // Look like a normal success so bots don't learn to skip the field.
      const { [HONEYPOT_FIELD]: _ignored, ...rest } = body as Record<string, unknown>;
      console.info("Honeypot filled, submission dropped");
      return json({ ...rest, id: crypto.randomUUID(), created_at: new Date().toISOString() });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return json({ detail: parsed.error.flatten().fieldErrors }, 400);
    }

    try {
      return await handle(parsed.data, req);
    } catch (err) {
      console.error("Form submission failed", err);
      return json({ detail: "Something went wrong. Please try again." }, 500);
    }
  };
}
