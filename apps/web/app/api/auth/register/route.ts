import { NextResponse } from "next/server";
import { z } from "zod";
import { registerUser } from "@/lib/auth-helpers";

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    try {
      await registerUser(email, password, name);
      return NextResponse.json({ success: true }, { status: 201 });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("ya está registrado") || message.includes("already registered")) {
        return NextResponse.json({ error: message }, { status: 409 });
      }
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
