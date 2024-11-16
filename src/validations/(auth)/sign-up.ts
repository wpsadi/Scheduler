import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().trim().email().min(5, "Email must be at least 5 characters long."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(50, "Name must be less than 50 characters.")
    .trim()
    .optional()
    .default("user")
});
