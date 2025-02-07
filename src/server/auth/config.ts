import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

interface JWTToken {
  sub?: string;
  email?: string;
  name?: string;
  id?: string;
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);

        if (user.length === 0) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user[0].password,
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user[0].id, name: user[0].name, email: user[0].email };
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        (token as JWTToken).sub = user.id;
        (token as JWTToken).email = user.email;
        (token as JWTToken).name = user.name;
        (token as JWTToken).id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: (token as JWTToken).sub,
          email: (token as JWTToken).email,
          name: (token as JWTToken).name,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
