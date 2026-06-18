export async function auth() {
  // server-side helper used in server components
  try {
    const res = await fetch("http://localhost:3000/api/auth/session", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function signOut() {
  // server action helper used by server components
  await fetch("http://localhost:3000/api/auth/logout", { method: "POST" });
  return { ok: true };
}

export default undefined;
