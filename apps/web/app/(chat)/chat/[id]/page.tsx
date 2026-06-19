import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, messages } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { ChatInterface } from "@/components/chat/chat-interface";

interface ChatPageProps {
  params: { id: string };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth();
  if (!session?.user?.id) return notFound();

  const conversation = await db.query.conversations.findFirst({
    where: and(eq(conversations.id, params.id), eq(conversations.userId, session.user.id)),
  });
  if (!conversation) return notFound();

  const msgs = await db.query.messages.findMany({
    where: eq(messages.conversationId, params.id),
  });
  msgs.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));

  const initialMessages = msgs
    .filter((m) => m.role !== "system")
    .map((m) => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content }));

  return <ChatInterface conversationId={params.id} initialMessages={initialMessages} />;
}
