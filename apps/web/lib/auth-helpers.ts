import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { randomUUID } from "crypto";

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<{ success: true }> {
  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) throw new Error("El email ya está registrado / Email already registered");
  const passwordHash = await bcryptjs.hash(password, 12);
  await db.insert(users).values({ id: randomUUID(), email, name, passwordHash });
  return { success: true };
}

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({ where: eq(users.email, email) });
}
