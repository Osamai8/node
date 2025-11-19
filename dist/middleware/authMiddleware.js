"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        const err = new Error("Invalid Token");
        err.status = 401;
        next(err);
    }
};
exports.default = verifyToken;
//# sourceMappingURL=authMiddleware.js.map