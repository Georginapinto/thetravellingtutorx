import type { Config } from "@netlify/functions";
import { sql } from "./_shared/db";
import { notifyTutorApplication } from "./_shared/email";
import { formHandler, json } from "./_shared/http";
import { tutorApplicationSchema } from "./_shared/schemas";
import { toRecord } from "./_shared/records";

export default formHandler(tutorApplicationSchema, async (t) => {
  const [row] = await sql()`
    insert into tutor_applications (name, email, phone, qualifications, experience, why_join)
    values (${t.name}, ${t.email}, ${t.phone}, ${t.qualifications}, ${t.experience}, ${t.why_join})
    returning *`;
  const record = toRecord(row);
  await notifyTutorApplication(t, record.created_at);
  return json(record);
});

export const config: Config = { path: "/api/tutor-application" };
