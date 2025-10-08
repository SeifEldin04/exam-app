import React from "react";
import AuthSideInfo from "../_components/auth-side-info";
import RegisterForm from "./_components/register-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <div className="max-w-[28.5rem]">
        {/* Headline */}
        <h1 className="font-inter font-bold text-3xl mb-10">Create Account</h1>

        {/* Form */}
        <RegisterForm />

        {/* Register */}
        <p className="text-gray-500 mt-9 text-center">
          Already have an account?{" "}
          <Link className="text-blue-600" href="/login">
            {" "}
            Login{" "}
          </Link>
        </p>
      </div>
    </main>
  );
}
