import { z } from "zod";

// Schema for login form validation
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

// Schema for signup form, extends loginSchema and adds additional fields
const signUpSchema = loginSchema
  .extend({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters")
      .max(15, "Name must be at most 15 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm: z.string({ required_error: "Please confirm your password" }),
  })
  // Custom validation: confirm password must match password
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export default function validationForm(mode, data) {
  // Choose schema based on mode and validate input data
  const result =
    mode === "login"
      ? loginSchema.safeParse(data)
      : signUpSchema.safeParse(data);

  // If validation fails, return the first error message
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return {
      success: false,
      message: firstIssue.message,
    };
  }

  // Validation passed
  return null;
}
