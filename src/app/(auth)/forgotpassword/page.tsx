import React from "react";
import AuthSideInfo from "../../../components/layout/auth/auth-side-info";
import Forgot from "./_components";

export default function Page() {
  return (
    <main className="flex h-screen">
      {/* left side (info) */}
      <AuthSideInfo />

      {/* right side (forgot password) */}
      <Forgot />
    </main>
  );
}
