"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "Escribe un mensaje... / Type a message...",
}: ChatInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !isLoading && value.trim()) {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="w-full px-4 md:px-8 py-4 bg-background flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-end gap-2 rounded-2xl border border-border/60 bg-muted/30 px-4 py-2.5 shadow-sm focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="min-h-[24px] max-h-[160px] resize-none flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 py-0.5"
            disabled={isLoading}
          />
          <Button
            size="icon"
            onClick={onSubmit}
            disabled={isLoading || !value.trim()}
            className="h-8 w-8 rounded-xl shrink-0 mb-0.5"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
