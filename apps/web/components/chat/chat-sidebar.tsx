"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@ai-chat/ui";
import type { DbConversation } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Plus, X } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const pathname = usePathname();
  const { t } = useLang();
  const [conversations, setConversations] = useState<DbConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/chat")
      .then((r) => r.json())
      .then(setConversations)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [pathname]);

  // Cierra el sidebar en móvil cuando cambia la ruta
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-full w-72 flex-col",
          "border-r border-border/40 bg-background",
          "transition-transform duration-300 ease-in-out",
          "md:static md:z-auto md:w-64 md:translate-x-0 md:bg-muted/20",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-3 border-b border-border/40">
          <Link href="/chat" className="flex-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-sm font-medium h-9"
            >
              <Plus className="h-4 w-4" />
              {t("newChat")}
            </Button>
          </Link>
          {/* Botón cerrar solo en móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-2">
            {isLoading ? (
              <>
                <Skeleton className="h-9 rounded-md" />
                <Skeleton className="h-9 rounded-md" />
                <Skeleton className="h-9 rounded-md" />
              </>
            ) : conversations.length === 0 ? (
              <p className="px-3 py-4 text-xs text-center text-muted-foreground">
                {t("noConversations")}
              </p>
            ) : (
              conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/chat/${conv.id}`}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150",
                    "hover:bg-accent/60 text-muted-foreground hover:text-foreground",
                    pathname === `/chat/${conv.id}` &&
                      "bg-accent text-foreground font-medium"
                  )}
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  <span className="truncate">{conv.title}</span>
                </Link>
              ))
            )}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}

