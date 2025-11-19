import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateSchema =
    (schema: ZodSchema<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query
                });

                if (req.body) Object.assign(req.body, parsed.body);
                if (req.params) Object.assign(req.params, parsed.params);
                if (req.query) Object.assign(req.query, parsed.query);

                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    res.status(400).json({
                        success: false,
                        message: "Validation failed",
                        errors: err.issues,
                    });
                }
                next(err);
            }
        }

export default validateSchema;