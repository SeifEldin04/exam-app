"use server";

import { AuthResponse } from "@/lib/types/auth";

type RegisterFields = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
};

export async function RegisterAction(data: RegisterFields) {
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

    return {
      id: payload.user._id,
      accesstoken: payload.token,
      ...payload.user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
