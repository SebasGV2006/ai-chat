"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AIModel } from "@ai-chat/types";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ModelSelector } from "./model-selector";
import { TypingIndicator } from "./typing-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatInterfaceProps {
  conversationId?: string;
  initialMessages?: { id: string; role: "user" | "assistant"; content: string }[];
}

export function ChatInterface({ conversationId, initialMessages }: ChatInterfaceProps) {
  const [model, setModel] = useState<AIModel>("gemini-2.5-flash");
  const [currentConvId, setCurrentConvId] = useState<string | undefined>(conversationId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: initialMessages ?? [],
    body: { model, conversationId: currentConvId ?? null },
    onResponse(response) {
      const convId = response.headers.get("X-Conversation-Id");
      if (convId && !currentConvId) {
        setCurrentConvId(convId);
        router.replace(`/chat/${convId}`);
      }
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
        <h2 className="text-sm font-medium text-muted-foreground">
          {currentConvId ? "Conversación activa / Active chat" : "Nueva conversación / New chat"}
        </h2>
        <ModelSelector value={model} onChange={setModel} />
      </div>
      <ScrollArea className="flex-1 px-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-lg font-medium">¿En qué puedo ayudarte?</p>
            <p className="text-sm text-muted-foreground mt-1">How can I help you today?</p>
          </div>
        ) : (
          <>
            {messages
              .filter((m) => m.role !== "system")
              .map((m) => (
                <ChatMessage
                  key={m.id}
                  role={m.role as "user" | "assistant"}
                  content={m.content}
                />
              ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
        <div ref={bottomRef} />
      </ScrollArea>
      <ChatInput
        value={input}
        onChange={(v) => handleInputChange({ target: { value: v } } as unknown as React.ChangeEvent<HTMLTextAreaElement>)}
        onSubmit={() => handleSubmit()}
        isLoading={isLoading}
      />
    </div>
  );
}
