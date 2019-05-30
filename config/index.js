const config = {}

config.redisStore = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
}
console.log(config);
module.exports = config
