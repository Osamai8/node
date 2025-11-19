"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ticketStatus = ["pending", "in_progress", "completed", "cancelled"];
const ticketsSchema = new mongoose_1.Schema({
    "created_by": { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
    "assigned_to": { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: false },
    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "ticket_number": { type: Number, required: true },
    "status": { type: String, required: true, enum: ticketStatus },
    "created_at": { type: Date, default: Date.now },
    "updated_at": { type: Date, default: Date.now },
});
const Tickets = (0, mongoose_1.model)("tickets", ticketsSchema);
exports.default = Tickets;
//# sourceMappingURL=ticketModel.js.map