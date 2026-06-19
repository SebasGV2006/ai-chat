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
import { useLang } from "@/components/providers/language-provider";
import { Sparkles } from "lucide-react";

interface ChatInterfaceProps {
  conversationId?: string;
  initialMessages?: { id: string; role: "user" | "assistant"; content: string }[];
}

export function ChatInterface({ conversationId, initialMessages }: ChatInterfaceProps) {
  const [model, setModel] = useState<AIModel>("gemini-2.5-flash");
  const [currentConvId, setCurrentConvId] = useState<string | undefined>(conversationId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useLang();

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
    <div className="h-full flex flex-col w-full">
      <div className="flex items-center justify-between px-6 py-3 border-b border-border/40 shrink-0 bg-background/50">
        <h2 className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
          {currentConvId ? t("activeChat") : t("newChat")}
        </h2>
        <ModelSelector value={model} onChange={setModel} />
      </div>
      <ScrollArea className="flex-1 w-full">
        <div className="w-full px-4 md:px-8 py-4 flex justify-center">
          <div className="w-full max-w-4xl">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{t("welcomeTitle")}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t("welcomeSubtitle")}</p>
                </div>
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
          </div>
        </div>
      </ScrollArea>
      <div className="shrink-0 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <ChatInput
          value={input}
          onChange={(v) => handleInputChange({ target: { value: v } } as unknown as React.ChangeEvent<HTMLTextAreaElement>)}
          onSubmit={() => handleSubmit()}
          isLoading={isLoading}
          placeholder={t("placeholder")}
        />
      </div>
    </div>
  );
}
