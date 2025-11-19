"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = exports.disconnectRedis = exports.connectRedis = void 0;
const redis_1 = require("redis");
let redis;
const connectRedis = async () => {
    redis = (0, redis_1.createClient)({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    redis.on('error', (err) => console.error('Redis error:', err));
    await redis.connect();
    console.log('Redis connected');
    return redis;
};
exports.connectRedis = connectRedis;
const disconnectRedis = async () => {
    if (redis) {
        await redis.disconnect();
        console.log('Redis disconnected');
    }
};
exports.disconnectRedis = disconnectRedis;
const getRedis = () => {
    if (!redis) {
        throw new Error('Redis client not initialized. Call connectRedis() first.');
    }
    return redis;
};
exports.getRedis = getRedis;
//# sourceMappingURL=redis.js.map