import { z } from "zod";

export const verifyEmailSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 characters long."),
    userId: z.string().max(36, "User ID must be less than 36 characters long.")
})