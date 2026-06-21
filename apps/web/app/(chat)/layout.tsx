import { Header } from "@/components/layout/header";
import { ChatLayoutClient } from "@/components/layout/chat-layout-client";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <ChatLayoutClient>{children}</ChatLayoutClient>
    </div>
  );
}
