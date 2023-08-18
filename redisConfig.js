// redisConfig.js
const redis = require("ioredis");

const redisClient = new redis({
  host: "redis-cache", // Change to your Redis server host
  port: 6379, // Default Redis port
  // ... other options
  connectTimeout: 10000,
});

module.exports = redisClient;
