import { AuthResponse } from "./lib/types/auth.d";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const payload: ApiResponse<AuthResponse> = await response.json();

        if ("code" in payload) {
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          accesstoken: payload.token,
          ...payload.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user._id = token._id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.username = token.username;
      session.user.email = token.email || "";
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.user.isVerified = token.isVerified;
      session.user.createdAt = token.createdAt;

      return session;
    },
  },
};
