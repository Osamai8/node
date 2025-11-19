import { Request, Response, NextFunction } from "express";
import { Db } from "mongodb";
import connectDB from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { REDIS_KEYS } from "../constants/redis";
import { clearRedisCacheByKey } from "../helpers/redis";
import { RegisterUserSchemaType, LoginUserSchemaType } from "../validators/auth.schema";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const db: Db = await connectDB();
        const { name, email, password } = req.body as RegisterUserSchemaType['body'];
        if (!name || !email || !password) {
            res.status(400).json({
                message: "All fields are required",
                response: {},
                success: false
            });
            return;
        }

        const user = await db.collection("users").findOne({ email }) as { _id: any; password?: string } | null;
        if (user) {
            res.status(400).json({
                message: "User already exists",
                response: {},
                success: false
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.collection("users").insertOne({ name, email, password: hashedPassword });

        await clearRedisCacheByKey(REDIS_KEYS.USERS_ALL);

        if (!newUser.insertedId) {
            res.status(400).json({
                message: "Failed to create user",
                response: {},
                success: false
            });
            return;
        }
        res.status(201).json({
            message: "User created successfully",
            response: {},
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const db: Db = await connectDB();
        const { email, password } = req.body as LoginUserSchemaType['body'];
        const user = await db.collection("users").findOne({ email }) as { _id: any; password: string } | null;
        if (!user) {
            res.status(400).json({
                message: "User not found",
                response: {},
                success: false
            });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({
                message: "Invalid password",
                response: {},
                success: false
            });
            return;
        }
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET as string, { expiresIn: "10h" });
        res.status(200).json({
            message: "Login successful",
            response: { data: { token } },
            success: true
        });

    } catch (error) {
        console.log('error in loginUser', error);
        next(error);
    }
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string };

        if (!decoded) {
            res.status(401).json({
                message: "Unauthorized",
                response: {},
                success: false
            });
            return;
        }

        res.status(200).json({
            message: "Logout successful",
            response: {},
            success: true
        });
    } catch (error) {
        console.log('error in logoutUser', error);
        next(error);
    }
}

