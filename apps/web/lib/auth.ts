import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth as nextAuthMiddleware, signIn, signOut } from "next-auth";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const authOptions = {
  adapter: DrizzleAdapter(db, { usersTable: users, sessionsTable: sessions }),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials: Record<string, unknown> | undefined) => {
        const parsed = credentialsSchema.safeParse(credentials ?? {});
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const user = await db.query.users.findFirst({ where: eq(users.email, email) });
        if (!user) return null;

        const matches = bcryptjs.compareSync(password, user.passwordHash);
        if (!matches) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "database" as const },
  pages: { signIn: "/login" },
  callbacks: {
    session({ session, user }: { session: any; user: any }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions as any);

export const handlers = { GET: handler, POST: handler };
export { signIn, signOut, nextAuthMiddleware as auth };
