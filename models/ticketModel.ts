import { Schema, model, Model } from "mongoose";

type TicketStatus = "pending" | "in_progress" | "completed" | "cancelled";

interface ITicket {
    created_by: Schema.Types.ObjectId;
    assigned_to?: Schema.Types.ObjectId;
    title: string;
    description: string;
    ticket_number: number;
    status: TicketStatus;
    created_at?: Date;
    updated_at?: Date;
}

const ticketStatus: TicketStatus[] = ["pending", "in_progress", "completed", "cancelled"];

const ticketsSchema = new Schema<ITicket>({
    "created_by": { type: Schema.Types.ObjectId, ref: "users", required: true },
    "assigned_to": { type: Schema.Types.ObjectId, ref: "users", required: false },
    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "ticket_number": { type: Number, required: true },
    "status": { type: String, required: true, enum: ticketStatus },
    "created_at": { type: Date, default: Date.now },
    "updated_at": { type: Date, default: Date.now },
});

const Tickets: Model<ITicket> = model<ITicket>("tickets", ticketsSchema);

export default Tickets;

