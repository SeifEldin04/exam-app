"use server";

import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

type ProfileSettingsValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
};

export async function profileSettingsAction(
  data: ProfileSettingsValues,
  req: NextRequest
) {
  try {
    const token = await getToken({ req });
    if (!token?.accesstoken) throw new Error("Unauthorized");

    const response = await fetch(`${process.env.API}/auth/editProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `${token.accesstoken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      success: response.ok,
      message: result.message,
      user: result.user,
    };
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export default async function deleteAccount(req: NextRequest) {
  try {
    const token = await getToken({ req });

    const response = await fetch(`${process.env.API}/auth/deleteMe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accesstoken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Something went wrong",
      };
    }

    return {
      success: true,
      message: result.message,
      user: result.user,
    };
  } catch (error) {
    console.error("Profile delete error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
