import React from "react";
import ToastProvider from "./components/toast-provider";
import ReactQueryProvider from "./components/react-query-provider";
import { ForgotProvider } from "./components/forgot-provider";

type providerProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: providerProps) {
  return (
    <ReactQueryProvider>
      <ForgotProvider>
        {children}
        <ToastProvider />
      </ForgotProvider>
    </ReactQueryProvider>
  );
}
