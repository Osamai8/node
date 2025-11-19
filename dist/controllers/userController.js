"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const redis_1 = require("../config/redis");
const redis_2 = require("../constants/redis");
const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query || {};
        const cacheKey = `${redis_2.REDIS_KEYS.USERS_ALL}:${page}:${limit}`;
        const redis = (0, redis_1.getRedis)();
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
        const users = await userModel_1.Users.find()
            .select("-password")
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();
        const totalUsers = await userModel_1.Users.countDocuments().exec();
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
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=userController.js.map