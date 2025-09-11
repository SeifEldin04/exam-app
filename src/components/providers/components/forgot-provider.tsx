"use client";

import React, { createContext, useContext, useState } from "react";

type ForgotStep = 1 | 2 | 3; // 1: email, 2: otp, 3: new password

type ForgotContextType = {
  step: ForgotStep;
  email: string;
  setEmail: (email: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: ForgotStep) => void;
};

const ForgotContext = createContext<ForgotContextType | undefined>(undefined);

export function ForgotProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<ForgotStep>(1);
  const [email, setEmail] = useState("");

  const nextStep = () =>
    setStep((prev) => (prev < 3 ? ((prev + 1) as ForgotStep) : prev));
  const prevStep = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as ForgotStep) : prev));
  const goToStep = (s: ForgotStep) => setStep(s);

  return (
    <ForgotContext.Provider
      value={{ step, email, setEmail, nextStep, prevStep, goToStep }}
    >
      {children}
    </ForgotContext.Provider>
  );
}

export function useForgot() {
  const context = useContext(ForgotContext);
  if (!context) throw new Error("useForgot must be used inside ForgotProvider");
  return context;
}
