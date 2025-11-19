import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
export declare const validateSchema: (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => void;
export default validateSchema;
//# sourceMappingURL=validateSchemaMiddleware.d.ts.map