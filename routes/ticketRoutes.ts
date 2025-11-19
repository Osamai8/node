import { Router } from "express";
import { getTickets, createTicket, updateTicket } from "../controllers/ticketController";
import { validateTicketUser } from "../middleware/ticketMiddleware";

const route = Router();

route.get('/get-all', getTickets);
route.post('/create', createTicket);
route.put('/update/:id', validateTicketUser, updateTicket);

export default route;

