import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    userId?: string;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        res.status(401).json({
            message: "Unauthorized",
            response: {},
            success: false
        });
        return;
    }

    try {
        const authToken = token.split(' ')[1];
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (error) {
        const err = new Error("Invalid Token") as Error & { status?: number };
        err.status = 401;
        next(err);
    }
}

export default verifyToken;

