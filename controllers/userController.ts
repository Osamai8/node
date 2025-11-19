import { Request, Response, NextFunction } from "express";
import { Users } from "../models/userModel";
import { getRedis } from "../config/redis";
import { REDIS_KEYS } from "../constants/redis";

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query || {};

        const cacheKey = `${REDIS_KEYS.USERS_ALL}:${page}:${limit}`;
        const redis = getRedis();

        const cachedUserData = await redis.get(cacheKey);
        if (cachedUserData) {
            res.status(200).json({
                message: "Users fetched successfully",
                response: JSON.parse(cachedUserData),
                success: true
            });
            return;
        }
        console.log('cache key', cacheKey);

        const users = await Users.find()
            .select("-password")
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();

        const totalUsers = await Users.countDocuments().exec();
        if (users.length === 0) {
            res.status(404).json({
                message: "No users found",
                response: {},
                success: false
            });
            return;
        }
        const response = {
            data: users,
            total: totalUsers
        };
        await redis.set(cacheKey, JSON.stringify(response), { EX: 60 * 60 }); // 1 hour

        res.status(200).json({
            message: "Users fetched successfully",
            response: response,
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export { getUsers };

