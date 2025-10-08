"use server";

import { ReceiveOtpValue } from "@/lib/schemas/auth.schema";

export async function ReceiveOtpAction(data: ReceiveOtpValue) {
  try {
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    if ("code" in payload) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error) {
    console.error("Error in OTP process:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
