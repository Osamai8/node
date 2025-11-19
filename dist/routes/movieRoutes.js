"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = require("../controllers/movieController");
const router = (0, express_1.Router)();
router.get('/get-all', movieController_1.getMovies);
exports.default = router;
//# sourceMappingURL=movieRoutes.js.map