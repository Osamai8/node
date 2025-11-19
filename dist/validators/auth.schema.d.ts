import { z } from "zod";
export declare const registerUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
    params: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
    query: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
}, z.core.$strip>;
export declare const loginUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
    params: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
    query: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
}, z.core.$strict>;
export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;
export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
//# sourceMappingURL=auth.schema.d.ts.map