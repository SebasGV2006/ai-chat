import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, messages } from "@/lib/db/schema";
import { getProvider } from "@/lib/ai/providers";
import type { AIModel } from "@ai-chat/types";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 10;

const bodySchema = z.object({
  messages: z
    .array(
      z.object({ role: z.enum(["user", "assistant", "system"]), content: z.string().min(1) })
    )
    .min(1),
  model: z.enum(["gemini-2.5-flash", "gemini-2.5-flash-lite-preview-06-17"]),
  conversationId: z.string().nullable(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const userId = (session.user as Record<string, unknown>).id as string;

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return new Response(JSON.stringify(parsed.error), { status: 400 });

  const incomingMessages = parsed.data.messages;
  const model = parsed.data.model;
  const lastMessage = incomingMessages[incomingMessages.length - 1];

  let convId: string;

    if (!parsed.data.conversationId) {
    const title = lastMessage.content.slice(0, 60);
    const id = randomUUID();
    await db.insert(conversations).values({ id, userId, title, model });
    convId = id;
  } else {
    const conversationId = parsed.data.conversationId;
    const conv = await db.query.conversations.findFirst({
      where: and(eq(conversations.id, conversationId), eq(conversations.userId, userId)),
    });
    if (!conv) return new Response("Forbidden", { status: 403 });
    convId = conversationId;
  }

  await db.insert(messages).values({
    id: randomUUID(),
    conversationId: convId,
    role: "user",
    content: lastMessage.content,
  });

  const result = await streamText({
    model: getProvider(model as AIModel),
    system: "Eres un asistente de IA útil y conciso. Responde en el mismo idioma que usa el usuario.",
    messages: incomingMessages,
    onFinish: async ({ text }) => {
      await db.insert(messages).values({
        id: randomUUID(),
        conversationId: convId,
        role: "assistant",
        content: text,
      });
      await db.update(conversations).set({ updatedAt: new Date() }).where(eq(conversations.id, convId));
    },
  });

  const response = result.toDataStreamResponse();
  response.headers.set("X-Conversation-Id", convId);
  return response;
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const userId = (session.user as Record<string, unknown>).id as string;

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    const conv = await db.query.conversations.findFirst({
      where: and(eq(conversations.id, id), eq(conversations.userId, userId)),
    });
    if (!conv) return new Response("Not found", { status: 404 });

    const msgs = await db.query.messages.findMany({ where: eq(messages.conversationId, id) });
    msgs.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
    return new Response(JSON.stringify(msgs), { headers: { "content-type": "application/json" } });
  }

  const convs = await db.query.conversations.findMany({ where: eq(conversations.userId, userId) });
  convs.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));
  return new Response(JSON.stringify(convs), { headers: { "content-type": "application/json" } });
}
