"use server";

import { join } from "path";
import Database from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { createClient } from "@libsql/client";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL ?? "file:./dev.db";

function createSqliteDatabase() {
  const sqliteUrl = DATABASE_URL.startsWith("file:")
    ? DATABASE_URL.slice("file:".length)
    : DATABASE_URL;

  const databaseFile = join(process.cwd(), sqliteUrl);
  const sqlite = new Database(databaseFile);
  sqlite.pragma("foreign_keys = ON");

  return drizzleSqlite(sqlite, { schema });
}

function createLibsqlDatabase() {
  const client = createClient({ url: DATABASE_URL });
  return drizzleLibsql(client, { schema });
}

function createDatabase() {
  if (DATABASE_URL.startsWith("libsql:")) {
    return createLibsqlDatabase();
  }

  if (DATABASE_URL.startsWith("file:") || DATABASE_URL.startsWith("./") || DATABASE_URL.startsWith("../")) {
    return createSqliteDatabase();
  }

  throw new Error(`Unsupported DATABASE_URL scheme: ${DATABASE_URL}`);
}

export const db = createDatabase();
export type DB = typeof db;
