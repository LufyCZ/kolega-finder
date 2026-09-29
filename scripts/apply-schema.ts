import { readFile } from "node:fs/promises";
import { db } from "../lib/db";

try {
  await db.query(await readFile(new URL("../db/schema.sql", import.meta.url), "utf8"));
  console.log("Application schema applied.");
} finally {
  await db.end();
}
