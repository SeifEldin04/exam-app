import React from "react";
import AuthSideInfo from "../../../components/layout/auth/auth-side-info";
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
