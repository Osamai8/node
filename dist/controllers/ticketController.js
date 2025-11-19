"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = exports.createTicket = exports.getTickets = void 0;
const ticketModel_1 = __importDefault(require("../models/ticketModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const getTickets = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query || {};
        const tickets = await ticketModel_1.default.find().limit(Number(limit)).skip((Number(page) - 1) * Number(limit)).exec();
        const totalTickets = await ticketModel_1.default.countDocuments().exec();
        if (tickets.length === 0) {
            res.status(404).json({
                message: "No tickets found",
                response: {},
                success: false
            });
            return;
        }
        res.status(200).json({
            message: "Tickets fetched successfully",
            response: {
                data: tickets,
                total: totalTickets
            },
            success: true
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTickets = getTickets;
const createTicket = async (req, res, next) => {
    try {
        const { title, description, assigned_to } = req.body;
        if (!title || !description || !assigned_to) {
            res.status(400).json({
                message: "All fields are required",
                response: {},
                success: false
            });
            return;
        }
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({
                message: "Unauthorized",
                response: { error: "Invalid token" },
                success: false
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded) {
            res.status(401).json({
                message: "Unauthorized",
                response: { error: "Invalid token" },
                success: false
            });
            return;
        }
        const userId = decoded.id;
        const ticketNumber = await ticketModel_1.default.countDocuments({}).exec() + 1;
        const newTicket = await ticketModel_1.default.create({
            title,
            description,
            assigned_to: new mongoose_1.Types.ObjectId(assigned_to),
            created_by: new mongoose_1.Types.ObjectId(userId),
            ticket_number: ticketNumber,
            status: "pending"
        });
        if (!newTicket) {
            res.status(400).json({
                message: "Failed to create ticket",
                response: {},
                success: false
            });
            return;
        }
        res.status(201).json({
            message: "Ticket created successfully",
            response: {
                data: newTicket
            },
            success: true
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTicket = createTicket;
const updateTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const ticket = await ticketModel_1.default.updateOne({ _id: id }, { $set: { title, description, status } }).exec();
        if (ticket.modifiedCount === 0) {
            res.status(404).json({
                message: "Ticket not found",
                response: {},
                success: false
            });
            return;
        }
        res.status(200).json({
            message: "Ticket updated successfully",
            response: {
                data: ticket
            },
            success: true
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTicket = updateTicket;
//# sourceMappingURL=ticketController.js.map