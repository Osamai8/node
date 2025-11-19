import { Schema, Model } from "mongoose";
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
declare const Tickets: Model<ITicket>;
export default Tickets;
//# sourceMappingURL=ticketModel.d.ts.map