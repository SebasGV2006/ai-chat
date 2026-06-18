import * as React from "react";
import { cn } from "@ai-chat/ui";

export const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";
