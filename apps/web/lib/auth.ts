import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";

const TOKEN_NAME = "authjs.session-token";

interface AuthUser extends JwtPayload {
  id: string;
  email: string;
  name?: string | null;
}

export async function auth(): Promise<{ user: AuthUser } | null> {
  try {
    const token = cookies().get(TOKEN_NAME)?.value;
    if (!token) return null;
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || "dev-secret-change-this");
    if (typeof payload === "string" || !payload || typeof payload !== "object") return null;
    return { user: payload as AuthUser };
  } catch {
    return null;
  }
}

export async function signOut() {
  // server action helper used by server components
  const base = process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;
  const url = new URL("/api/auth/logout", base).toString();
  await fetch(url, { method: "POST" });
  return { ok: true };
}

export default undefined;
