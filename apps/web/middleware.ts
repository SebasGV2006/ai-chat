import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionToken = !!request.cookies.get("authjs.session-token");

  if (pathname.startsWith("/api/auth")) return NextResponse.next();
  if (pathname.startsWith("/api/")) {
    if (!hasSessionToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.next();
  }
  if (!hasSessionToken && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (hasSessionToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
