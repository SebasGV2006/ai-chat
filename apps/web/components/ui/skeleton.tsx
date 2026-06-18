import * as React from "react";
import { cn } from "@ai-chat/ui";

export const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("animate-pulse rounded-md bg-slate-200/70 dark:bg-slate-800/70", className)}
    {...props}
  />
));
Skeleton.displayName = "Skeleton";
