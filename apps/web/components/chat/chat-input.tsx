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
    <div className="flex items-end gap-2 p-4 border-t bg-background">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        className="min-h-[44px] max-h-[200px] resize-none flex-1"
        disabled={isLoading}
      />
      <Button
        size="icon"
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="h-11 w-11 shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
