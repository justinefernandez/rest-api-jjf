const config = {};

config.redisStore = {
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
  ssl: true,
};
console.log(config.redisStore);
module.exports = config;
