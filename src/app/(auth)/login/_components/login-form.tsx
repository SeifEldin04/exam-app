"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Error from "@/components/layout/exam/error-paragraph";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export default function LoginForm() {
  // Variables
  const [error, setError] = useState("");

  // Hooks
  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { isPending, mutateAsync: login } = useMutation({
    mutationFn: (values: LoginValues) =>
      signIn("credentials", { ...values, redirect: false }),
  });

  // Submit handler
  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    setError("");

    const payload = await login({
      email: data.email,
      password: data.password,
    });

    if (payload?.error) {
      setError(payload.error);
    } else {
      location.href =
        new URLSearchParams(location.search).get("callbackUrl") || "/";
    }
  };

  return (
    <div className="flex flex-col w-1/2 justify-center items-center px-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="font-inter font-bold text-3xl mb-10">Login</h1>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pb-4">
                {/* Label */}
                <FormLabel> Email </FormLabel>

                {/* Field */}
                <FormControl className="mb-4">
                  <Input
                    placeholder="user@example.com"
                    {...field}
                    className={`
                                ${
                                  form.formState.errors.email &&
                                  "border-red-500"
                                }`}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel> Password </FormLabel>

                {/* Field */}
                <FormControl>
                  <PasswordInput
                    placeholder="********"
                    {...field}
                    className={`
                                ${
                                  form.formState.errors.password &&
                                  "border-red-500"
                                }`}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Link
            className="flex justify-end mt-2 text-blue-600 mb-10"
            href="/forgotpassword"
          >
            Forgot your password?
          </Link>

          {error && <Error message={error} />}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-gray-500 mt-9 text-center">
            Dont have an account?{" "}
            <Link className="text-blue-600" href="/register">
              {" "}
              Create yours{" "}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
