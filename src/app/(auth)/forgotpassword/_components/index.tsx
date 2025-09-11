"use client";

import React from "react";
import ForgotPasswordEmail from "./forgot-password-email";
import ReceiveOtp from "./recive-otp";
import SetNewPassword from "./set-newPassword";
import { useForgot } from "@/components/providers/components/forgot-provider";

export default function Forgot() {
  const { step } = useForgot();

  return (
    <>
      {step === 1 && <ForgotPasswordEmail />}
      {step === 2 && <ReceiveOtp />}
      {step === 3 && <SetNewPassword />}
    </>
  );
}
