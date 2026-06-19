"use client";

import * as React from "react";
import { cn } from "@ai-chat/ui";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Select({ value, onValueChange, className, children, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
      className={cn(
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function SelectValue({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("block truncate", className)} {...props} />;
}

export function SelectContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-1 rounded-md border border-input bg-background shadow-lg", className)} {...props} />;
}

export function SelectItem({ value, children, className, ...props }: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> & { value: string }) {
  return (
    <option value={value} className={cn("px-3 py-2 text-sm", className)} {...props}>
      {children}
    </option>
  );
}
