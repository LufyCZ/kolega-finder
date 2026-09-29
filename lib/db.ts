import { Pool } from "pg";

const globalPool = globalThis as typeof globalThis & { kolegaPool?: Pool };

export const db = globalPool.kolegaPool ?? new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
  max: 5,
});

if (process.env.NODE_ENV !== "production") globalPool.kolegaPool = db;
