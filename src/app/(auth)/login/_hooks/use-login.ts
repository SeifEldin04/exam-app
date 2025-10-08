import { LoginValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import React from "react";

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const payload = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (payload?.error) {
        throw new Error(payload.error);
      }

      const redirectUrl = new URL(payload?.url || `${location.origin}/`);
      const callbackUrl = redirectUrl.searchParams.get("callbackUrl") || "/";

      location.href = location.origin + callbackUrl;
    },
  });

  return { isPending, error, login: mutate };
}
