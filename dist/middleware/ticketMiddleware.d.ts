import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
declare const validateTicketUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export { validateTicketUser };
//# sourceMappingURL=ticketMiddleware.d.ts.map