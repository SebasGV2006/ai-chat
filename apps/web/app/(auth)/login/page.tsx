import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <LoginForm />
      <p className="text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-primary underline-offset-4 hover:underline">
          Regístrate / Sign up
        </Link>
      </p>
    </div>
  );
}
