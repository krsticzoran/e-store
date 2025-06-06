import { z } from "zod";

export const submitOrderSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .min(3, "First name must be at least 3 characters long"),

  last_name: z
    .string({ required_error: "Last name is required" })
    .min(3, "Last name must be at least 3 characters long"),

  city: z
    .string({ required_error: "City name is required" })
    .min(3, "City must be at least 3 characters long"),

  country: z.string({ required_error: "Country name is required" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .min(5, "Phone must be at least 5 characters")
    .max(20, "Phone must be at most 20 characters"),

  address_1: z
    .string({ required_error: "Address is required" })
    .min(3, "Address must be at least 3 characters long"),

  postcode: z
    .string({ required_error: "Postcode is required" })
    .min(3, "Postcode must be at least 3 characters long"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
});

export default function validationSubmitOrder(data) {
  // validate input data
  const result = submitOrderSchema.safeParse(data);

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
