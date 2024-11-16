import { z } from "zod";

export const sendPasswordRecoverySchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    url: z.string().url({ message: "Invalid URL format" })
})