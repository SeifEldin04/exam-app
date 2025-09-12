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
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  accountSettingsProfileSchema,
  AccountSettingsProfileValues,
} from "@/lib/schemas/account.schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Loader, TriangleAlert } from "lucide-react";
import deleteAccount, {
  profileSettingsAction as profileSettingsRequest,
} from "../_actions/profile-settings.action";
import toast from "react-hot-toast";
import ErrorParagraph from "@/components/layout/exam/error-paragraph";
import { signOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { AccountSettings } from "@/lib/types/account-settings";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AccountSettingsForm({
  session,
}: {
  session: AccountSettings;
}) {
  const [error, setError] = useState<string>("");

  // Normalize number to show in input to edit
  const normalizePhoneInput = (phone: string) =>
    phone.startsWith("0") ? "+20" + phone.slice(1) : phone;

  // Normalize number to send to backend
  const normalizePhone = (phone: string) =>
    phone.startsWith("+20") ? phone.replace("+20", "0") : phone;

  const { mutateAsync: profileSettings, isPending } = useMutation({
    mutationFn: (values: AccountSettingsProfileValues) =>
      profileSettingsRequest(values),
  });

  const form = useForm<AccountSettingsProfileValues>({
    defaultValues: {
      firstName: session.firstName || "",
      lastName: session.lastName || "",
      username: session.username || "",
      email: session.email || "",
      phone: session.phone ? normalizePhoneInput(session.phone) : "",
    },
    resolver: zodResolver(accountSettingsProfileSchema),
  });

  const onSubmit: SubmitHandler<AccountSettingsProfileValues> = async (
    data
  ) => {
    const payload = { ...data, phone: normalizePhone(data.phone) };
    const response = await profileSettings(payload);

    if (response.success) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-gray-800 text-white text-sm px-11 py-3 shadow-lg flex items-center gap-2`}
        >
          <Check className="w-5 h-5 text-green-400" />
          <span>{response.message}</span>
        </div>
      ));
    } else {
      setError(response.message || "An error occurred while saving changes.");
    }
  };

  async function handleDeleteAccount() {
    const response = await deleteAccount();

    if (response.success) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-gray-800 text-white text-sm px-11 py-3 shadow-lg flex items-center gap-2`}
        >
          <Check className="w-5 h-5 text-green-400" />
          <span>Account deleted successfully</span>
        </div>
      ));

      await signOut({ callbackUrl: "/register" });
    } else {
      setError(
        response.message || "An error occurred while deleting the account"
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full gap-5">
          {/* First name */}
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seif Eldin"
                      {...field}
                      className={
                        form.formState.errors.firstName ? "border-red-500" : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Last name */}
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Khaled"
                      {...field}
                      className={
                        form.formState.errors.lastName ? "border-red-500" : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pt-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="user123"
                  {...field}
                  className={
                    form.formState.errors.username ? "border-red-500" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="py-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  {...field}
                  className={
                    form.formState.errors.email ? "border-red-500" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  placeholder="Enter a phone number"
                  {...field}
                  className={
                    form.formState.errors.phone ? "border-red-500" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error message */}
        {error && <ErrorParagraph message={error} />}

        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="w-full mt-10 bg-red-50 text-red-600 hover:bg-red-100"
              >
                Delete My Account
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="px-9 py-14">
                <DialogTitle className="m-auto bg-red-50 w-28 h-28 flex items-center justify-center rounded-full">
                  <div className="w-20 h-20 bg-red-100 flex items-center justify-center rounded-full">
                    <TriangleAlert className="text-red-600 w-14 h-12" />
                  </div>
                </DialogTitle>

                <DialogDescription className="pt-9">
                  <h1 className="text-red-600 font-medium text-lg text-center">
                    Are you sure you want to delete your account?
                  </h1>
                  <p className="text-gray-500 text-sm text-center mt-3">
                    This action is permanent and cannot be undone.
                  </p>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="bg-gray-50 border-t border-gray-200 py-6 px-14">
                <Button
                  type="button"
                  className="w-full bg-gray-200 text-black hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteAccount}
                >
                  Yes, Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button type="submit" disabled={isPending} className="w-full mt-10">
            {isPending ? <Loader className="animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
