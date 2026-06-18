import * as React from "react";
import { cn } from "@ai-chat/ui";

export const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted text-muted-foreground", className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("flex h-full w-full items-center justify-center text-xs font-semibold", className)} {...props} />
));
AvatarFallback.displayName = "AvatarFallback";
