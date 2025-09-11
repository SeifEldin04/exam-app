import React from "react";
import AuthSideInfo from "../../../components/layout/auth/auth-side-info";
import RegisterForm from "./_components/register-form";

export default function Page() {
  return (
    <main className="flex min-h-screen">
      {/* left side (info) */}
      <AuthSideInfo />

      {/* right side (login inputs) */}
      <div className="w-1/2">
        <RegisterForm />
      </div>
    </main>
  );
}
