import { z } from "zod";

// Register
export const registerSchema = z
  .object({
    firstName: z.string().nonempty("Your first name is required"),

    lastName: z.string().nonempty("Your last name is required"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .nonempty("Your username is required"),

    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .nonempty("Your phone number is required"),

    email: z
      .email("Please enter a valid email")
      .nonempty("Your email is required"),

    password: z
      .string()
      .min(
        6,
        "Password must be at least 8 characters , at least one special character , one uppercase and lowercase letter"
      )
      .nonempty("Your password is required"),

    rePassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Your passwords do not match",
    path: ["rePassword"],
  });

// Login
export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .nonempty("Your email is required"),
  password: z.string().nonempty("Your password is required"),
});

// Forgot password
// step (1)
export const ForgotPasswordEmailSchema = z.object({
  email: z
    .email("Please enter a valid email")
    .nonempty("Your email is required"),
});

// Step (2)
export const ReceiveOtpSchema = z.object({
  resetCode: z.string().nonempty("Your OTP is required"),
});

// Step (3)
export const SetNewPasswordSchema = z
  .object({
    email: z
      .email("Please enter a valid email")
      .nonempty("Your email is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Your password is required"),

    rePassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Your passwords do not match",
    path: ["rePassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotPasswordEmailValue = z.infer<
  typeof ForgotPasswordEmailSchema
>;
export type ReceiveOtpValue = z.infer<typeof ReceiveOtpSchema>;
export type SetNewPasswordValue = z.infer<typeof SetNewPasswordSchema>;
