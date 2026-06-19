import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { BotMessageSquare } from "lucide-react";

async function handleSignOut() {
  "use server";
  await signOut();
}

export async function Header() {
  const session = await auth();

  return (
    <header className="relative flex h-14 items-center justify-between px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border after:to-transparent">
      <div className="flex gap-2 items-center">
        <SidebarToggle />
        <BotMessageSquare className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm gradient-text">AI Chat</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
        {session?.user && (
          <>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-semibold">
                {((session.user.name as string | null | undefined)?.[0] || (session.user.email as string | undefined)?.[0] || "U").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <form action={handleSignOut}>
              <Button variant="ghost" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
