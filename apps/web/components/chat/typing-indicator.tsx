"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BotMessageSquare } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex flex-row gap-3 py-3">
      <Avatar className="h-8 w-8 shrink-0 bg-muted text-muted-foreground">
        <AvatarFallback className="bg-muted text-muted-foreground">
          <BotMessageSquare className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted text-foreground rounded-lg px-4 py-2">
        <div className="flex gap-1 items-center h-6">
          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
        </div>
      </div>
    </div>
  );
}
