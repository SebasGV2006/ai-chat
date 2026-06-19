import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_NAME = "authjs.session-token";

function createCookie(token: string) {
  const secure = process.env.NODE_ENV === "production";
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  return `${TOKEN_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return new Response(JSON.stringify({ error: "Missing credentials" }), { status: 400 });

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!user) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

    const matches = bcryptjs.compareSync(password, user.passwordHash);
    if (!matches) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

    const payload = { id: user.id, email: user.email, name: user.name };
    const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET || "dev-secret-change-this", { expiresIn: "7d" });

    const headers = new Headers();
    headers.append("Set-Cookie", createCookie(token));
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.stack || err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
