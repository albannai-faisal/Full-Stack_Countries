import redis from "redis";

const client = redis.createClient(
  {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
);

const cacheConnect = async () => {
  client.on('connect', () => console.log('Redis Client Connected'));
  client.on('error', err => console.log('Redis Client Error', err));

  setInterval(() => {
    console.log(new Date(), "Keeping alive - Node.js Performance Test with Redis");
    client.set('ping', 'pong');
  }, 1000 * 60);

  await client.connect();
};

/*const cacheGet = async (key) => {
  return await client.get(key);
};

const cacheSet = async (key, value) => {
  return await client.set(key, value);
};*/

export { client, cacheConnect };
