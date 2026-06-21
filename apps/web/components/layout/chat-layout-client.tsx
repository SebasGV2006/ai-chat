"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";

export function ChatLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    const handler = () => setSidebarOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handler);
    return () => window.removeEventListener("toggle-sidebar", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden">
      <ChatSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <main className="flex flex-1 overflow-hidden min-w-0">{children}</main>
    </div>
  );
}
