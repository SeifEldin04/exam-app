"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ReceiveOtpSchema, ReceiveOtpValue } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Error from "@/components/layout/exam/error-paragraph";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ReceiveOtpAction } from "../_actions/receive-otp.action";
import { useForgot } from "@/components/providers/components/forgot-provider";
import { ForgotPasswordEmailAction } from "../_actions/forgot-password-email.action";

export default function ReceiveOtp() {
  // Variables
  const [error, setError] = useState<string | "">("");
  const [timer, setTimer] = useState(60);
  const [isSending, setIsSending] = useState(false); // pending resend OTP state

  // Hooks
  const { isPending, mutateAsync: otpForgot } = useMutation({
    mutationFn: (values: ReceiveOtpValue) => ReceiveOtpAction(values),
  });

  const { prevStep, nextStep, email } = useForgot();

  const form = useForm<ReceiveOtpValue>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(ReceiveOtpSchema),
  });

  // Countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    setIsSending(true);
    try {
      await ForgotPasswordEmailAction({ email });
      setTimer(30);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  // Submit handler
  const onSubmit: SubmitHandler<ReceiveOtpValue> = async (values) => {
    setError("");

    const response = await otpForgot(values);

    console.log(response);

    if (response.status) {
      nextStep();
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
              className="border cursor-pointer border-gray-200 w-fit p-1"
              onClick={prevStep}
            >
              {" "}
              <MoveLeft />{" "}
            </div>

            {/* header info */}
            <h1 className="font-inter font-bold text-3xl mb-2 mt-14">
              Verify OTP
            </h1>
            <p className="mb-10 text-gray-500">
              Please enter the 6-digits code we have sent to: <br />
              user@example.com{" "}
              <span
                onClick={prevStep}
                className="text-blue-600 underline cursor-pointer"
              >
                {" "}
                Edit{" "}
              </span>
            </p>

            {/* OTP */}
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  {/* Field */}
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timer to resend OTP */}
            <p className="font-medium text-sm text-gray-500 mt-9 text-center">
              {timer > 0 ? (
                <>
                  You can request another code in:{" "}
                  {String(timer).padStart(2, "0")}s
                </>
              ) : (
                <>
                  You can now request a new code{" "}
                  <span
                    className={`underline cursor-pointer ${
                      isSending ? "text-gray-400" : "text-blue-600"
                    }`}
                    onClick={!isSending ? handleResend : undefined}
                  >
                    {isSending ? "Sending..." : "Resend"}
                  </span>
                </>
              )}
            </p>

            {/* error message */}
            {error && <Error message={error} />}

            <Button className="w-full my-10" type="submit" disabled={isPending}>
              {isPending ? <Loader className="animate-spin" /> : "Verify Code"}
            </Button>

            <p className="text-gray-500 text-center">
              Don't have an account?{" "}
              <Link className="text-blue-600" href="/register">
                {" "}
                Create yours{" "}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
