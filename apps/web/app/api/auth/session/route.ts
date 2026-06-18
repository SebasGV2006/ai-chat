import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const TOKEN_NAME = "authjs.session-token";

export async function GET(req: NextRequest) {
  
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("__token="));
    if (!match) return new Response(JSON.stringify({ user: null }), { status: 200 });
    const token = decodeURIComponent(match.split("=")[1] || "");
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || "dev-secret-change-this");
    return new Response(JSON.stringify({ user: payload }), { status: 200 });
  } catch (err: unknown) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
}
