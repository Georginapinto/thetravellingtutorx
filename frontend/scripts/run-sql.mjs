// Runs a .sql file against the database in DATABASE_URL, one statement at a time.
//   cd frontend
//   node scripts/run-sql.mjs ../db/001_init.sql
//
// Statements are split on semicolons, which suits the plain DDL in db/. A file
// containing a function body or a string with a semicolon in it needs the Neon
// SQL editor instead.
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/run-sql.mjs <file.sql>");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const statements = (await readFile(file, "utf8"))
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s && !s.split("\n").every((line) => line.trim().startsWith("--")));

console.log(`${file}: ${statements.length} statements`);
for (const [i, statement] of statements.entries()) {
  const label = (statement.split("\n").find((line) => line.trim() && !line.trim().startsWith("--")) ?? "").slice(0, 70);
  process.stdout.write(`  ${i + 1}/${statements.length} ${label} ... `);
  await sql.query(statement);
  console.log("ok");
}
console.log("Done.");
