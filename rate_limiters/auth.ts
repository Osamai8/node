import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

const loginRateLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req: Request, res: Response, _next: NextFunction) => {
        res.setHeader('Retry-After', 15 * 60);
        console.log("damn rate limit");
        res.status(429).json({
            message: "Too many login attempts, please try again later",
            response: {},
            success: false
        });
    }
});

export {
    loginRateLimiter
};

