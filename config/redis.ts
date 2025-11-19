import { createClient, RedisClientType } from 'redis';

let redis: RedisClientType | undefined;

const connectRedis = async (): Promise<RedisClientType> => {
    redis = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    }) as RedisClientType;

    redis.on('error', (err) => console.error('Redis error:', err));
    await redis.connect();
    console.log('Redis connected');
    return redis;
}

const disconnectRedis = async (): Promise<void> => {
    if (redis) {
        await redis.disconnect();
        console.log('Redis disconnected');
    }
}

const getRedis = (): RedisClientType => {
    if (!redis) {
        throw new Error('Redis client not initialized. Call connectRedis() first.');
    }
    return redis;
}

export { connectRedis, disconnectRedis, getRedis };

