"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
const ticketMiddleware_1 = require("../middleware/ticketMiddleware");
const route = (0, express_1.Router)();
route.get('/get-all', ticketController_1.getTickets);
route.post('/create', ticketController_1.createTicket);
route.put('/update/:id', ticketMiddleware_1.validateTicketUser, ticketController_1.updateTicket);
exports.default = route;
//# sourceMappingURL=ticketRoutes.js.map