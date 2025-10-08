import { RegisterValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";

export default function useRegister() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const payload = await registerAction(values);

      if (payload.message !== "success") {
        throw new Error(payload.message);
      }

      location.href = "/login";
    },
  });

  return { isPending, error, register: mutate };
}
