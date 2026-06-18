import * as React from "react";
import { cn } from "@ai-chat/ui";

export const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-full overflow-auto", className)}
    {...props}
  />
));
ScrollArea.displayName = "ScrollArea";
