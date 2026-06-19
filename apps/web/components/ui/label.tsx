import * as React from "react";
import { cn } from "@ai-chat/ui";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium text-foreground", className)} {...props} />
));
Label.displayName = "Label";
