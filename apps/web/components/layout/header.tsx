import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { BotMessageSquare } from "lucide-react";
import { MenuButton } from "@/components/layout/menu-button";
import { signOutAction } from "@/components/layout/signout-action";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex h-14 items-center justify-between px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border/40 shrink-0">
      <div className="flex items-center gap-2">
        {/* Botón hamburguesa solo en móvil */}
        <MenuButton />
        <BotMessageSquare className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm gradient-text">AI Chat</span>
      </div>
      <div className="flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
        {session?.user && (
          <>
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs">
                {session.user.name?.charAt(0)?.toUpperCase() ??
                  session.user.email?.charAt(0)?.toUpperCase() ??
                  "U"}
              </AvatarFallback>
            </Avatar>
            <form action={signOutAction}>
              <Button variant="ghost" size="sm" type="submit" className="text-xs h-8">
                Sign out
              </Button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
