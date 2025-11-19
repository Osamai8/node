import { z } from "zod";

export const registerUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters" }),
        email: z.email({ message: "Invalid email address" }),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" })
            .refine((password) => password.length >= 8, { message: "Password must be at least 8 characters" }),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const loginUserSchema = z.object({
    body: z.object({
        email: z.email({ message: "Invalid email address" }),
        password: z.string().min(4, { message: "Password must be at least 8 characters" }),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
}).strict();

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;
export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;