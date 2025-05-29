import { z } from "zod";

export const userSchema = z.object({
  first_name: z.string().min(3, "First name is required"),
  last_name: z.string().min(3, "Last name is required"),
  city: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
