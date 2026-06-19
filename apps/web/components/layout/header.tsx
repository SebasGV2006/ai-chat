import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BotMessageSquare } from "lucide-react";

async function handleSignOut() {
  "use server";
  await signOut();
}

export async function Header() {
  const session = await auth();

  return (
    <header className="flex h-14 items-center justify-between border-b px-4 bg-background shrink-0">
      <div className="flex gap-2 items-center">
        <BotMessageSquare className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">AI Chat</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {session?.user && (
          <>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-semibold">
                {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <form action={handleSignOut}>
              <Button variant="ghost" size="sm" type="submit">
                Salir / Sign out
              </Button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
