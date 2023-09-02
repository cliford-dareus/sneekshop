import NextAuth from "next-auth/next";
import prisma from "@/libs/prismaDB";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import type { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface NextAuthSession extends Session {
  user: {
    [key: string]: string | undefined | null | unknown;
  };
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          // Return all the profile information you need.
          // The only truly required field is `id`
          // to be able identify the account when added to a database
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter an email and password");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user?.hashedPassword) {
            throw new Error("No user found");
          }

          const passwordMath = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!passwordMath) {
            throw new Error("Invalid Credentials");
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({
      token,
      session,
    }: {
      token: JWT
      session: NextAuthSession;
    }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
} as AuthOptions;

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
