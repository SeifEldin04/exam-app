"use server";

type EmailField = {
  email: string;
};

export async function ForgotPasswordEmailAction(data: EmailField) {
  try {
    const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    if (!payload.success) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error) {
    console.error("Error in forgot process:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
