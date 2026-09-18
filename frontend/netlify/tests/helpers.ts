import { vi } from "vitest";

// Records every query made through the mocked `sql()` client and answers each
// with the next queued result.
export function createSqlMock() {
  const results: Record<string, unknown>[][] = [];
  const calls: { text: string; values: unknown[] }[] = [];
  const query = vi.fn(async (strings: TemplateStringsArray, ...values: unknown[]) => {
    calls.push({ text: strings.join("?").replace(/\s+/g, " ").trim(), values });
    return results.shift() ?? [];
  });
  return {
    query,
    calls,
    willReturn(...rows: Record<string, unknown>[][]) {
      results.push(...rows);
    },
    reset() {
      results.length = 0;
      calls.length = 0;
      query.mockClear();
    },
  };
}

export const post = (path: string, body: unknown) =>
  new Request(`https://example.test${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

export const CREATED_AT = new Date("2026-09-16T10:00:00.000Z");
export const ID = "6f1c6c1e-6a55-4f59-9a3f-2f6f7b0f5c11";
