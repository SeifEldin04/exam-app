"use server";

import getToken from "@/lib/utils/get-token.server";
import { getServerSession } from "next-auth";
import { cookies, headers } from "next/headers";

type ProfileSettingsValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
};

export async function profileSettingsAction(data: ProfileSettingsValues) {
  try {
    const token = await getToken();

    const response = await fetch(`${process.env.API}/auth/editProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accesstoken}`,
      },
      body: JSON.stringify(data),
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
    console.error("Profile update error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export default async function deleteAccount() {
  try {
    const token = await getToken();

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
