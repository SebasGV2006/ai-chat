"use client";

import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { useLang } from "@/components/providers/language-provider";

export default function RegisterPage() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <RegisterForm />
      <p className="text-sm text-muted-foreground">
        {t("hasAccount")} {" "}
        <Link href="/login" className="text-primary underline-offset-4 hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
