import { Request, Response, NextFunction } from "express";
declare const getTickets: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const createTicket: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateTicket: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getTickets, createTicket, updateTicket };
//# sourceMappingURL=ticketController.d.ts.map