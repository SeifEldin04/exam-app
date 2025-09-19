import React from "react";
import Forgot from "./_components";
import { ForgotProvider } from "@/components/providers/components/forgot-provider";

export default function Page() {
  return (
    <ForgotProvider>
      <div className="w-1/2 flex flex-col justify-center items-center ">
        <Forgot />
      </div>
    </ForgotProvider>
  );
}
