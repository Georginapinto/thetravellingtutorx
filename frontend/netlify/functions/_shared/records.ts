export type DbRecord = Record<string, unknown> & { id: string; created_at: string };

// The Neon driver returns timestamptz columns as Date; the API returns ISO strings.
export function toRecord(row: Record<string, unknown> | undefined): DbRecord {
  if (!row) throw new Error("Insert returned no row");
  const createdAt = row.created_at;
  return {
    ...row,
    id: String(row.id),
    created_at: createdAt instanceof Date ? createdAt.toISOString() : String(createdAt),
  };
}
