import {z} from 'zod';

export const sendVerifyEmailSchema = z.object({
    url: z.string().url({ message: "Invalid URL format" })
})