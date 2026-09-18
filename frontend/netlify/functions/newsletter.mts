import type { Config } from "@netlify/functions";
import { sql } from "./_shared/db";
import { notifyNewsletter } from "./_shared/email";
import { formHandler, json } from "./_shared/http";
import { newsletterSchema } from "./_shared/schemas";
import { toRecord } from "./_shared/records";

export default formHandler(newsletterSchema, async (n) => {
  const db = sql();
  const [inserted] = await db`
    insert into newsletter_subscribers (email, source)
    values (${n.email}, ${n.source})
    on conflict (email) do nothing
    returning *`;

  // Repeat signups get the existing row back and don't notify again.
  if (!inserted) {
    const [existing] = await db`select * from newsletter_subscribers where email = ${n.email}`;
    return json(toRecord(existing));
  }

  const record = toRecord(inserted);
  await notifyNewsletter(n, record.created_at);
  return json(record);
});

export const config: Config = { path: "/api/newsletter" };
