"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import React from "react";
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
import SubmissionFeedback from "@/components/layout/submission-feedback";
import { Loader } from "lucide-react";
import useLogin from "../_hooks/use-login";

export default function LoginForm() {
  // Form
  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { isPending, error, login } = useLogin();

  // Submit handler
  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[28rem]">
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

        {error && <SubmissionFeedback message={error.message} />}

        <Button
          type="submit"
          className="w-full"
          disabled={
            isPending || (form.formState.isSubmitted && !form.formState.isValid)
          }
        >
          {isPending ? (
            <Loader className="animate-spin mr-2" size={16} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
