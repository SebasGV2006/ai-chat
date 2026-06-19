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
import { useLang } from "@/components/providers/language-provider";
import { useSidebar } from "@/components/providers/sidebar-provider";

export function ChatSidebar() {
  const [conversations, setConversations] = useState<DbConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { t } = useLang();
  const { isOpen } = useSidebar();

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/chat")
      .then((r) => r.json())
      .then(setConversations)
      .finally(() => setIsLoading(false));
  }, [pathname]);

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-muted/20 border-r border-border/40 transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className="p-3 border-b border-border/40 min-w-[16rem]">
        <Link href="/chat" className="w-full">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm font-medium hover:bg-accent/60 h-9"
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span className="truncate">{t("newChat")}</span>
          </Button>
        </Link>
      </div>
      <ScrollArea className="flex-1 min-w-[16rem]">
        {isLoading ? (
          <div className="space-y-1 p-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9 mx-2 my-1 rounded-md" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <p className="text-center text-xs text-muted-foreground py-4">
            {t("noConversations")}
          </p>
        ) : (
          <nav className="space-y-1 px-2">
            {conversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/chat/${conv.id}`}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150",
                  "hover:bg-accent/60 text-muted-foreground hover:text-foreground",
                  pathname === `/chat/${conv.id}` && "bg-accent text-foreground font-medium"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-60" />
                <span className="truncate">{conv.title}</span>
              </Link>
            ))}
          </nav>
        )}
      </ScrollArea>
    </aside>
  );
}

