import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.REDIS_SECRET, {
  tls: { rejectUnauthorized: false }, // required for Upstash
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

