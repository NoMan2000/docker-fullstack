import { keys } from './keys';
import { Pool } from 'pg';
import redis from 'redis';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export const app = express();
app.use(cors());
app.use(bodyParser.json());

export const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: Number(keys.pgHost),
});

pgClient.on('error', () => console.log('Lost PG Connection!'));

pgClient.query('CREATE TABLE IF NOT EXISTS values(number INT)')
    .catch(err => console.error(err));

// Redis Client setup

export const redisClient = redis.createClient({
    host: keys.redisHost,
    port: Number(keys.redisPort),
    retry_strategy: () => 1000,
});

// Express route handlers.

app.get('/', (req, res) => {
    res.send('It is working');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
    const index = req.body.index;
    redisClient.hset('values', index, 'Nothing Yet!');
    try {
    await pgClient.query("INSERT INTO values (number) VALUES($1)", [index]);
    } catch (err) {
        console.error({err});
    }
    res.send({working: true});
});

app.listen((Number(keys.expressPort) || 5000), (err) => {
    console.log("Listening");
    if (err) {
        console.error({err});
    }
});