import mongoose from "mongoose";
import { Db } from "mongodb";

async function connectDB(): Promise<Db> {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.db as Db;
    }

    const uri = process.env.MONGO_URL;
    const dbName = process.env.MONGO_DB || 'ticket_bounty';
    if (!uri) {
        throw new Error("MONGO_URL env var is required (e.g., mongodb+srv://user:pass@host/db)");
    }
    console.log('uri', uri);
    console.log('dbName', dbName);

    try {
        await mongoose.connect(uri, {
            dbName,
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            },
        });

        console.log(`MongoDB connected: ${dbName}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }

    // graceful shutdown hook
    if (!process.listenerCount('SIGINT')) {
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log("MongoDB connection closed");
            } finally {
                process.exit(0);
            }
        });
    }

    return mongoose.connection.db as Db;
}

export default connectDB;

