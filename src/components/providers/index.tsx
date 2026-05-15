"use client";

import React from "react";
import ToastProvider from "./components/toast-provider";
import ReactQueryProvider from "./components/react-query-provider";
import { ForgotProvider } from "./components/forgot-provider";
import { SessionProvider } from "next-auth/react";

type providerProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: providerProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ForgotProvider>
          {children}
          <ToastProvider />
        </ForgotProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
