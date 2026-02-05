import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email").optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });
