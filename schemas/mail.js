import { z } from "zod";

export const mailSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("contact"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Please enter a valid email address"),
    subject: z
      .string({ required_error: "Subject is required" })
      .min(6, "Subject must be at least 6 characters long"),
    message: z
      .string({ required_error: "Message is required" })
      .min(10, "Message must be at least 10 characters long"),
  }),
  z.object({
    type: z.literal("subscription"),
    email: z.string().email({ message: "Invalid email" }),
    subject: z.literal("subscription"),
    message: z.literal("subscription"),
  }),
]);
