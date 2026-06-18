const TOKEN_NAME = "authjs.session-token";

export async function POST() {
  const headers = new Headers();
  // clear cookie
  headers.append("Set-Cookie", `${TOKEN_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
}
