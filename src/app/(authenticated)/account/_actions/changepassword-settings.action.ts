"use server";

import getToken from "@/lib/utils/get-token.server";

type AccountSettingsChangepasswordValues = {
  oldPassword: string;
  password: string;
  rePassword: string;
};

export async function changePasswordAction(
  data: AccountSettingsChangepasswordValues
) {
  try {
    const token = await getToken();

    const response = await fetch(`${process.env.API}/auth/changePassword`, {
      method: "PATCH",
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
    console.error("Change password error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
