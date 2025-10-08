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
import { PasswordInput } from "@/components/ui/password-input";
import { registerSchema, RegisterValues } from "@/lib/schemas/auth.schema";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";
import SubmissionFeedback from "@/components/layout/submission-feedback";
import { Loader } from "lucide-react";
import useRegister from "../_hooks/use-register";

export default function RegisterForm() {
  //   Form
  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  //   Normalize phone function to replace "+20 => 0"
  const normalizePhone = (phone: string) => {
    if (phone.startsWith("+20")) {
      return phone.replace("+20", "0");
    }
    return phone;
  };

  const { isPending, error, register } = useRegister();

  //   Submit handler
  const onSubmit: SubmitHandler<RegisterValues> = async (values) => {
    const payload = {
      ...values,
      phone: normalizePhone(values.phone),
    };

    register(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[28.5rem]">
        <div className="flex w-full gap-5">
          <div className="w-1/2">
            {/* Fisrt name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel> First name </FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder="Seif Eldin"
                      {...field}
                      className={`
                                    ${
                                      form.formState.errors.firstName &&
                                      "border-red-500"
                                    }`}
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/2">
            {/* Last name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel> Last name </FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder="Khaled"
                      {...field}
                      className={`
                                    ${
                                      form.formState.errors.lastName &&
                                      "border-red-500"
                                    }`}
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* User name */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pt-2">
              {/* Label */}
              <FormLabel> Username </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  placeholder="user123"
                  {...field}
                  className={`
                                ${
                                  form.formState.errors.username &&
                                  "border-red-500"
                                }`}
                />
              </FormControl>

              {/* Feedback */}
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

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="my-2">
              {/* Label */}
              <FormLabel className="text-left">Phone Number</FormLabel>

              {/* Field */}
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="Enter a phone number"
                  {...field}
                  className={`
                                ${
                                  form.formState.errors.phone &&
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
            <FormItem className="pt-2">
              {/* Label */}
              <FormLabel> Password </FormLabel>

              {/* Field */}
              <FormControl className="mb-4">
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

        {/* Confirm password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="pt-2">
              {/* Label */}
              <FormLabel> Confirm Password </FormLabel>

              {/* Field */}
              <FormControl className="mb-4">
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
        {error && <SubmissionFeedback message={error.message} />}

        <Button
          type="submit"
          className="w-full mt-10"
          disabled={
            isPending || (form.formState.isSubmitted && !form.formState.isValid)
          }
        >
          {isPending ? (
            <Loader className="animate-spin mr-2" size={16} />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
