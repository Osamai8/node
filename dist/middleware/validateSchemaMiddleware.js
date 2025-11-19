"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        if (req.body)
            Object.assign(req.body, parsed.body);
        if (req.params)
            Object.assign(req.params, parsed.params);
        if (req.query)
            Object.assign(req.query, parsed.query);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: err.issues,
            });
        }
        next(err);
    }
};
exports.validateSchema = validateSchema;
exports.default = exports.validateSchema;
//# sourceMappingURL=validateSchemaMiddleware.js.map