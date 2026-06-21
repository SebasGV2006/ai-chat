import { NextResponse } from "next/server";
import { z } from "zod";
import { registerUser } from "@/lib/auth-helpers";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    await registerUser(email, password, name);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    const status = message.includes("ya está registrado") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

