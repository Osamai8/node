"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, { message: "Name must be at least 2 characters" }),
        email: zod_1.z.email({ message: "Invalid email address" }),
        password: zod_1.z.string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" })
            .refine((password) => password.length >= 8, { message: "Password must be at least 8 characters" }),
    }),
    params: zod_1.z.object({}).optional(),
    query: zod_1.z.object({}).optional(),
});
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email({ message: "Invalid email address" }),
        password: zod_1.z.string().min(4, { message: "Password must be at least 8 characters" }),
    }),
    params: zod_1.z.object({}).optional(),
    query: zod_1.z.object({}).optional(),
}).strict();
//# sourceMappingURL=auth.schema.js.map