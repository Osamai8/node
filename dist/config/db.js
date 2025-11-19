"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default.connection.db;
    }
    const uri = process.env.MONGO_URL;
    const dbName = process.env.MONGO_DB || 'sample_restaurants';
    if (!uri) {
        throw new Error("MONGO_URL env var is required (e.g., mongodb+srv://user:pass@host/db)");
    }
    try {
        await mongoose_1.default.connect(uri, {
            dbName,
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            }
        });
        console.log(`MongoDB connected: ${dbName}`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
    // graceful shutdown hook
    if (!process.listenerCount('SIGINT')) {
        process.on('SIGINT', async () => {
            try {
                await mongoose_1.default.connection.close();
                console.log("MongoDB connection closed");
            }
            finally {
                process.exit(0);
            }
        });
    }
    return mongoose_1.default.connection.db;
}
exports.default = connectDB;
//# sourceMappingURL=db.js.map