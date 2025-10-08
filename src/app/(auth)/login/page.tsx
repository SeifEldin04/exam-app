import React from "react";
import AuthSideInfo from "../_components/auth-side-info";
import LoginForm from "./_components/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <div className="max-w-[28.5rem]">
        {/* Headline */}
        <h1 className="font-inter font-bold text-3xl mb-10">Login</h1>

        {/* Form */}
        <LoginForm />

        {/* Register */}
        <p className="text-gray-500 mt-9 text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-600" href="/register">
            {" "}
            Create yours{" "}
          </Link>
        </p>
      </div>
    </main>
  );
}
