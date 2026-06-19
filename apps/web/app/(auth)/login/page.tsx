"use client";

import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { useLang } from "@/components/providers/language-provider";

export default function LoginPage() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <LoginForm />
      <p className="text-sm text-muted-foreground">
        {t("noAccount")} {" "}
        <Link href="/register" className="text-primary underline-offset-4 hover:underline">
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}
