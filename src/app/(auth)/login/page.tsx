import React from "react";
import { FolderCode } from "lucide-react";
import AuthSideInfo from "../../../components/layout/auth/auth-side-info";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import LoginForm from "./_components/login-form";

export default function Page() {
  return (
    <main className="flex h-screen">
      {/* left side (info) */}
      <AuthSideInfo />

      {/* right side (login inputs) */}
      <div className="w-1/2">
        <LoginForm />
      </div>
    </main>
  );
}
