const {env} = process;
export const keys = {
    redisHost: env.REDIS_HOST,
    redisPort: env.REDIS_PORT,
    pgUser: env.PGUSER,
    pgHost: env.PGHOST,
    pgDatabase: env.PGDATABASE,
    pgPassword: env.PGPASSWORD,
    expressPort: env.EXPRESS_SERVER_PORT
};