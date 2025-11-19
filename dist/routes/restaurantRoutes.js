"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurantController_1 = require("../controllers/restaurantController");
const router = (0, express_1.Router)();
router.get('/get-all', restaurantController_1.getRestaurant);
exports.default = router;
//# sourceMappingURL=restaurantRoutes.js.map