"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const loginRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res, _next) => {
        res.setHeader('Retry-After', 15 * 60);
        console.log("damn rate limit");
        res.status(429).json({
            message: "Too many login attempts, please try again later",
            response: {},
            success: false
        });
    }
});
exports.loginRateLimiter = loginRateLimiter;
//# sourceMappingURL=auth.js.map