"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../rate_limiters/auth");
const auth_schema_1 = require("../validators/auth.schema");
const validateSchemaMiddleware_1 = __importDefault(require("../middleware/validateSchemaMiddleware"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/register', (0, validateSchemaMiddleware_1.default)(auth_schema_1.registerUserSchema), authController_1.registerUser);
router.post('/login', auth_1.loginRateLimiter, (0, validateSchemaMiddleware_1.default)(auth_schema_1.loginUserSchema), authController_1.loginUser);
router.post('/logout', authMiddleware_1.default, authController_1.logoutUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map