"use client";
import React from "react";

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  // lightweight passthrough provider for custom auth
  return <>{children}</>;
}
