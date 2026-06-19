"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@ai-chat/ui";
import type { DbConversation } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Plus } from "lucide-react";

export function ChatSidebar() {
  const [conversations, setConversations] = useState<DbConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/chat")
      .then((r) => r.json())
      .then(setConversations)
      .finally(() => setIsLoading(false));
  }, [pathname]);

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-muted/30">
      <div className="p-4">
        <Link href="/chat" className="w-full">
          <Button variant="outline" className="w-full justify-center">
            <Plus className="h-4 w-4" />
            Nueva conversación / New chat
          </Button>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="space-y-1 p-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9 mx-2 my-1 rounded-md" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <p className="text-center text-xs text-muted-foreground py-4">
            Sin conversaciones / No conversations
          </p>
        ) : (
          <nav className="space-y-1 px-2">
            {conversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/chat/${conv.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                  pathname === `/chat/${conv.id}` && "bg-accent font-medium"
                )}
              >
                <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{conv.title}</span>
              </Link>
            ))}
          </nav>
        )}
      </ScrollArea>
    </aside>
  );
}
