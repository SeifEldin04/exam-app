"use server";

import { SetNewPasswordValue } from "@/lib/schemas/auth.schema";

export async function SetNewPasswordAction(data: SetNewPasswordValue) {
  try {
    const response = await fetch(`${process.env.API}/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    if ("code" in payload) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error) {
    console.error("Error in reset password process:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
