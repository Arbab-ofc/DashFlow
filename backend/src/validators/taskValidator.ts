import { z } from "zod";

const statusSchema = z.enum(["PENDING", "COMPLETED"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: statusSchema.optional()
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional().nullable(),
    status: statusSchema.optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });
