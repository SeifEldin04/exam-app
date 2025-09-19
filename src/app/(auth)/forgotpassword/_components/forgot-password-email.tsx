"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ForgotPasswordEmailSchema,
  ForgotPasswordEmailValue,
} from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgotPasswordEmailAction } from "../_actions/forgot-password-email.action";
import Error from "@/components/layout/exam/error-paragraph";
import { useMutation } from "@tanstack/react-query";
import { useForgot } from "@/components/providers/components/forgot-provider";

export default function ForgotPasswordEmail() {
  // Variables
  const [error, setError] = useState<string | "">("");

  // Hooks
  const { isPending, mutateAsync: forgotEmail } = useMutation({
    mutationFn: (values: ForgotPasswordEmailValue) =>
      ForgotPasswordEmailAction(values),
  });

  const { nextStep, setEmail } = useForgot();

  const form = useForm<ForgotPasswordEmailValue>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordEmailSchema),
  });

  // submit handler
  const onSubmit: SubmitHandler<ForgotPasswordEmailValue> = async (values) => {
    setError("");

    const response = await forgotEmail(values);

    if (response.message === "success") {
      setEmail(values.email);
      nextStep();
    } else {
      setError(response.message || "An error occurred during forgot process");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center my-80 px-20">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="font-inter font-bold text-3xl mb-2">
            Forgot Password
          </h1>
          <p className="mb-10 text-gray-500">
            Dont worry, we will help you recover your account.
          </p>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel> Email </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className={`mb-4 ${
                      form.formState.errors.email && "border-red-500"
                    }`}
                    placeholder="user@example.com"
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* error message */}
          {error && <Error message={error} />}

          <Button className="w-full my-10" type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                Continue <MoveRight />
              </>
            )}
          </Button>

          <p className="text-gray-500 text-center">
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
