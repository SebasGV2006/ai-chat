import { Header } from "@/components/layout/header";
import { ChatSidebar } from "@/components/chat/chat-sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <main className="flex flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
