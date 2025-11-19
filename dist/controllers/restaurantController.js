"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurant = void 0;
const redis_1 = require("../config/redis");
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
// change DB name to "sample_restaurants" if you want to use this
const getRestaurant = async (req, res, next) => {
    try {
        const { cuisine, borough, page = 1, limit = 10 } = req.query || {};
        const redis = (0, redis_1.getRedis)();
        const cacheKey = `restaurants:${cuisine}:${borough}:${page}:${limit}`;
        const cacheData = await redis.get(cacheKey);
        if (cacheData) {
            res.status(200).json({
                message: "Data fetched successfully",
                response: {
                    data: JSON.parse(cacheData).data,
                    total: JSON.parse(cacheData).total
                },
                success: true
            });
            return;
        }
        const conditions = {};
        if (cuisine)
            conditions.cuisine = cuisine;
        if (borough)
            conditions.borough = borough;
        const restaurants = await restaurantModel_1.default.find(conditions)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();
        const totalRestaurants = await restaurantModel_1.default.countDocuments(conditions).exec();
        await redis.set(cacheKey, JSON.stringify({
            data: restaurants,
            total: totalRestaurants
        }), { EX: 3600 }); // 1 hour
        if (restaurants.length === 0) {
            res.status(404).json({
                message: "No data found",
                response: {},
                success: false
            });
            return;
        }
        res.status(200).json({
            message: "Data fetched successfully",
            response: {
                data: restaurants,
                total: totalRestaurants
            },
            success: true
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getRestaurant = getRestaurant;
//# sourceMappingURL=restaurantController.js.map