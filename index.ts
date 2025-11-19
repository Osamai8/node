import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/authRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import userRoutes from "./routes/userRoutes";

import connectDB from "./config/db";
import morgan from "morgan";
import cors from "cors";
import { connectRedis } from "./config/redis";
import verifyToken from "./middleware/authMiddleware";



connectDB();
connectRedis();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(),)

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url} ${JSON.stringify(req, null, 2)}`);
//     next();
// });

app.get("/", (_, res: Response) => {
    res.send("API is running...");
});

// app.use('/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/ticket', verifyToken, ticketRoutes);
app.use('/user', verifyToken, userRoutes);


app.use((err: Error & { status?: number }, _: Request, res: Response, next: NextFunction) => {
    console.log('ahhhhh', err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        response: {},
        success: false,
    });
    next();
})

app.listen(Number(PORT) || 3000, () =>
    console.log(`Server running on ${PORT}`)
);

