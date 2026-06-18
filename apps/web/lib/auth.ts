import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const TOKEN_NAME = "authjs.session-token";

export async function auth() {
  // server-side helper used in server components
  try {
    const token = cookies().get(TOKEN_NAME)?.value;
    if (!token) return null;
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || "dev-secret-change-this");
    return { user: payload };
  } catch {
    return null;
  }
}

export async function signOut() {
  // server action helper used by server components
  await fetch("/api/auth/logout", { method: "POST" });
  return { ok: true };
}

export default undefined;
