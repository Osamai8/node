"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTicketUser = void 0;
const ticketModel_1 = __importDefault(require("../models/ticketModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateTicketUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const ticket = await ticketModel_1.default.findById(id).exec();
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
        const decoded = jsonwebtoken_1.default.decode(token);
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
    }
    catch (error) {
        next(error);
    }
};
exports.validateTicketUser = validateTicketUser;
//# sourceMappingURL=ticketMiddleware.js.map