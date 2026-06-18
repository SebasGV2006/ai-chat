import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <RegisterForm />
      <p className="text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-primary underline-offset-4 hover:underline">
          Inicia sesión / Sign in
        </Link>
      </p>
    </div>
  );
}
