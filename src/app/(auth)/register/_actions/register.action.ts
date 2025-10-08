"use server";

import { RegisterValues } from "@/lib/schemas/auth.schema";
import { AuthResponse } from "@/lib/types/auth";

export async function registerAction(data: RegisterValues) {
  try {
    const response = await fetch(`${process.env.API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload: ApiResponse<AuthResponse> = await response.json();

    if ("code" in payload) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
