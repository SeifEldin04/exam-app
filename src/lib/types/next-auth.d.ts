import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      phone: string;
      role: string;
      isVerified: boolean;
      createdAt: string;
    };
    accessToken?: string;
  }

  interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown> {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    accessToken: string;
  }
}
