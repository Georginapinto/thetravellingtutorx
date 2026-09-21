import type { Config } from "@netlify/functions";
import { sql } from "./_shared/db";
import { notifyContact } from "./_shared/email";
import { formHandler, json } from "./_shared/http";
import { contactSchema } from "./_shared/schemas";
import { toRecord } from "./_shared/records";

export default formHandler(contactSchema, async (c) => {
  const [row] = await sql()`
    insert into contacts (name, email, role, subject, message)
    values (${c.name}, ${c.email}, ${c.role}, ${c.subject}, ${c.message})
    returning *`;
  const record = toRecord(row);
  await notifyContact(c, record.created_at);
  return json(record);
});

export const config: Config = { path: "/api/contact" };
