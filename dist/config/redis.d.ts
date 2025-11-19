import { RedisClientType } from 'redis';
declare const connectRedis: () => Promise<RedisClientType>;
declare const disconnectRedis: () => Promise<void>;
declare const getRedis: () => RedisClientType;
export { connectRedis, disconnectRedis, getRedis };
//# sourceMappingURL=redis.d.ts.map