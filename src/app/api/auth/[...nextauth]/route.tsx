import NextAuth from "next-auth/next";
import prisma from "@/libs/prismaDB";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Awaitable } from "next-auth";
import { User } from "@prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
