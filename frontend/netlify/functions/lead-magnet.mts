import type { Config } from "@netlify/functions";
import { sql } from "./_shared/db";
import { notifyLeadMagnet, sendLeadMagnetDownload } from "./_shared/email";
import { formHandler, json } from "./_shared/http";
import { MAGNETS } from "./_shared/magnets";
import { leadMagnetSchema } from "./_shared/schemas";
import { toRecord } from "./_shared/records";

export default formHandler(leadMagnetSchema, async (l, req) => {
  const [row] = await sql()`
    insert into lead_magnets (first_name, email, audience, magnet)
    values (${l.first_name}, ${l.email}, ${l.audience}, ${l.magnet})
    returning *`;
  const record = toRecord(row);

  // The schema only accepts known ids, so the lookup always succeeds.
  const magnet = MAGNETS[l.magnet]!;
  // The request's own origin, so deploy previews and `netlify dev` link to themselves.
  const downloadUrl = new URL(magnet.path, req.url).toString();

  await Promise.all([
    notifyLeadMagnet(l, magnet, record.created_at),
    magnet.ready ? sendLeadMagnetDownload(l, magnet, downloadUrl) : undefined,
  ]);
  return json(record);
});

export const config: Config = { path: "/api/lead-magnet" };
