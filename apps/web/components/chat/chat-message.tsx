"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, BotMessageSquare } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === "system") return null;

  if (role === "user") {
    return (
      <div className="flex flex-row-reverse gap-3 py-3">
        <Avatar className="h-8 w-8 shrink-0 bg-primary text-primary-foreground">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="max-w-[75%] bg-primary text-primary-foreground rounded-lg px-4 py-2">
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 py-3">
      <Avatar className="h-8 w-8 shrink-0 bg-muted text-muted-foreground">
        <AvatarFallback className="bg-muted text-muted-foreground">
          <BotMessageSquare className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[75%] bg-muted text-foreground rounded-lg px-4 py-2">
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
