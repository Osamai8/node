import { Request, Response, NextFunction } from "express";
import Tickets from "../models/ticketModel";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const getTickets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query || {};
        const tickets = await Tickets.find().limit(Number(limit)).skip((Number(page) - 1) * Number(limit)).exec();
        const totalTickets = await Tickets.countDocuments().exec();
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
    } catch (error) {
        next(error);
    }
}

const createTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        const decoded = jwt.decode(token) as { id: string } | null;
        if (!decoded) {
            res.status(401).json({
                message: "Unauthorized",
                response: { error: "Invalid token" },
                success: false
            });
            return;
        }
        const userId = decoded.id;
        const ticketNumber = await Tickets.countDocuments({}).exec() + 1;
        const newTicket = await Tickets.create({
            title,
            description,
            assigned_to: new Types.ObjectId(assigned_to),
            created_by: new Types.ObjectId(userId),
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
    } catch (error) {
        next(error);
    }
}

const updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const ticket = await Tickets.updateOne({ _id: id }, { $set: { title, description, status } }).exec();
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
    } catch (error) {
        next(error);
    }
}

export { getTickets, createTicket, updateTicket };

