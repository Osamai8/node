"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRedisCacheByKey = exports.clearRedisCacheByKey = void 0;
const redis_1 = require("../config/redis");
const clearRedisCacheByKey = async (key) => {
    const redis = (0, redis_1.getRedis)();
    const keys = await redis.keys(`${key}:*`);
    for (const key of keys) {
        await redis.del(key);
    }
};
exports.clearRedisCacheByKey = clearRedisCacheByKey;
const setRedisCacheByKey = async (key, value) => {
    const redis = (0, redis_1.getRedis)();
    await redis.set(key, value);
    await redis.expire(key, 60 * 60 * 24 * 10); // 10 days
};
exports.setRedisCacheByKey = setRedisCacheByKey;
//# sourceMappingURL=redis.js.map