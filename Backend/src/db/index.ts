import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { SCHEMA_SQL, SEED_SQL } from "./schema";

const DB_FILE =
  process.env.DB_FILE ?? path.join(process.cwd(), "data", "analytics.db");

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

/** Single shared connection reused by every service. */
export const db = new Database(DB_FILE);

console.log(
  "Database created and data added successfully at: /data/analytics.db",
);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Schema is applied on module load so services can safely prepare statements.
db.exec(SCHEMA_SQL);

const { count } = db.prepare("SELECT COUNT(*) AS count FROM videos").get() as {
  count: number;
};
if (count === 0) {
  db.exec(SEED_SQL);
}
