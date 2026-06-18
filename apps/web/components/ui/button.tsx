"use client";

import * as React from "react";
import { cn } from "@ai-chat/ui";

const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost: "bg-transparent hover:bg-muted",
  outline: "border border-input bg-transparent hover:bg-muted",
} as const;

const buttonSizes = {
  default: "h-11 px-4 py-2",
  sm: "h-9 px-3 text-sm",
  icon: "h-10 w-10 p-0",
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
