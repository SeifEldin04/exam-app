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
import {
  SetNewPasswordSchema,
  SetNewPasswordValue,
} from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Error from "@/components/layout/exam/error-paragraph";
import { useMutation } from "@tanstack/react-query";
import {
  ResetPasswordField,
  SetNewPasswordAction,
} from "../_actions/set-newPassword.action";
import { PasswordInput } from "@/components/ui/password-input";
import { useForgot } from "@/components/providers/components/forgot-provider";
import { useRouter } from "next/navigation";

export default function SetNewPassword() {
  // Variables
  const [error, setError] = useState<string | "">("");

  // Hooks
  const { isPending, mutateAsync: setNewPassword } = useMutation({
    mutationFn: (values: ResetPasswordField) => SetNewPasswordAction(values),
  });

  const { prevStep, email } = useForgot();

  const router = useRouter();

  const form = useForm<SetNewPasswordValue>({
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
    resolver: zodResolver(SetNewPasswordSchema),
  });

  // Submit handler
  const onSubmit: SubmitHandler<SetNewPasswordValue> = async (values) => {
    setError("");

    const payload = {
      email,
      newPassword: values.newPassword,
    };

    const response = await setNewPassword(payload);

    console.log(response);

    if (response.message === "success") {
      router.push("/login");
    } else {
      setError(response.message || "An error occurred during forgot process");
    }
  };

  return (
    <div className="w-1/2">
      <div className="my-60 mx-32">
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* prev */}
            <div
              className="border border-gray-200 w-fit p-1 cursor-pointer"
              onClick={prevStep}
            >
              {" "}
              <MoveLeft />{" "}
            </div>

            {/* header info */}
            <h1 className="font-inter font-bold text-3xl mb-2 mt-14">
              Create a New Password
            </h1>
            <p className="mb-10 text-gray-500">
              Create a new strong password for your account.
            </p>

            {/* New password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel> New Password </FormLabel>

                  {/* Field */}
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className={`mb-4 ${
                        form.formState.errors.newPassword && "border-red-500"
                      }`}
                      placeholder="********"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Re password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel> Confirm New Password </FormLabel>

                  {/* Field */}
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className={`mb-4 ${
                        form.formState.errors.rePassword && "border-red-500"
                      }`}
                      placeholder="********"
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
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
