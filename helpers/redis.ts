import { getRedis } from "../config/redis";

export const clearRedisCacheByKey = async (key: string): Promise<void> => {
    const redis = getRedis();
    const keys = await redis.keys(`${key}:*`);
    for (const key of keys) {
        await redis.del(key);
    }
}

export const setRedisCacheByKey = async (key: string, value: string): Promise<void> => {
    const redis = getRedis();
    await redis.set(key, value);
    await redis.expire(key, 60 * 60 * 24 * 10); // 10 days
}

