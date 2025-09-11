"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  accountSettingsChangepasswordSchema,
  AccountSettingsChangepasswordValues,
} from "@/lib/schemas/account.schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { changePasswordAction as changePasswordRequest } from "../_actions/changepassword-settings.action";
import { toast } from "react-hot-toast";
import { Check, Loader } from "lucide-react";
import Error from "@/components/layout/exam/error-paragraph";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export default function AccountSettingsChangepassword() {
  // Variables
  const [error, setError] = useState<string | "">("");

  // Hooks
  const form = useForm<AccountSettingsChangepasswordValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(accountSettingsChangepasswordSchema),
  });

  const { mutateAsync: changePassword, isPending } = useMutation({
    mutationFn: (values: AccountSettingsChangepasswordValues) =>
      changePasswordRequest(values),
  });

  // Submit handler
  const onSubmit: SubmitHandler<AccountSettingsChangepasswordValues> = async (
    data
  ) => {
    const response = await changePassword(data);

    if (response.success) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-gray-800 text-white text-sm px-11 py-3 shadow-lg flex items-center justify-start gap-2`}
        >
          <Check className="w-5 h-5 text-green-400" />
          <span>Your password has been updated.</span>
        </div>
      ));

      signOut({
        callbackUrl: "/login",
      });
    } else {
      setError(response.message || "An error occurred during password change");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Old Password */}
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="my-2">
              {/* Label */}
              <FormLabel className="text-left">Current Password</FormLabel>

              {/* Field */}
              <FormControl className="w-full">
                <PasswordInput
                  placeholder="********"
                  {...field}
                  className={`
                                        ${
                                          form.formState.errors.oldPassword &&
                                          "border-red-500"
                                        }`}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-2">
              {/* Label */}
              <FormLabel className="text-left">New Password</FormLabel>

              {/* Field */}
              <FormControl className="w-full">
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

        {/* Re Password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="my-2">
              {/* Label */}
              <FormLabel className="text-left">Confirm New Password</FormLabel>

              {/* Field */}
              <FormControl className="w-full">
                <PasswordInput
                  placeholder="********"
                  {...field}
                  className={`
                                        ${
                                          form.formState.errors.rePassword &&
                                          "border-red-500"
                                        }`}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* error message */}
        {error && <Error message={error} />}

        <Button type="submit" disabled={isPending} className="w-full mt-10">
          {isPending ? (
            <Loader className="animate-spin mr-2" />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
