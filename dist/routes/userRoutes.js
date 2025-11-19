"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const route = (0, express_1.Router)();
route.get('/get-all', userController_1.getUsers);
exports.default = route;
//# sourceMappingURL=userRoutes.js.map