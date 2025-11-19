import { Request, Response, NextFunction } from "express";
import Tickets from "../models/ticketModel";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    userId?: string;
}

const validateTicketUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(id);
        const ticket = await Tickets.findById(id).exec();
        if (!ticket) {
            res.status(404).json({
                message: "Ticket not found",
                response: {},
                success: false
            });
            return;
        }
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Unauthorized",
                response: {},
                success: false
            });
            return;
        }
        const decoded = jwt.decode(token) as { id: string } | null;
        if (!decoded) {
            res.status(401).json({
                message: "Unauthorized",
                response: {},
                success: false
            });
            return;
        }
        const userId = decoded.id;
        console.log(userId, String(ticket.created_by), String(ticket.assigned_to));
        if (String(ticket.created_by) !== userId && String(ticket.assigned_to) !== userId) {
            res.status(403).json({
                message: "Unauthorized",
                response: {},
                success: false
            });
            return;
        }
        next();

    } catch (error) {
        next(error);
    }
}

export { validateTicketUser };

