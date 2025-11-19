"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const morgan_1 = __importDefault(require("morgan"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const redis_1 = require("./config/redis");
const helmet_1 = __importDefault(require("helmet"));
(0, db_1.default)();
(0, redis_1.connectRedis)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url} ${JSON.stringify(req, null, 2)}`);
//     next();
// });
app.get("/", (_, res) => {
    res.send("API is running...");
});
// app.use('/auth', authRoutes);
app.use('/auth', authRoutes_1.default);
app.use('/ticket', authMiddleware_1.default, ticketRoutes_1.default);
app.use('/user', authMiddleware_1.default, userRoutes_1.default);
app.use((err, _, res, next) => {
    console.log('ahhhhh', err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        response: {},
        success: false,
    });
    next();
});
app.listen(Number(PORT) || 3000, () => console.log(`Server running on ${PORT}`));
//# sourceMappingURL=index.js.map