import { keys } from './keys';
import redis from 'redis';

export const redisClient = redis.createClient({
    host: keys.redisHost,
    port: Number(keys.redisPort),
    retry_strategy: () => 1000,
});

export const sub = redisClient.duplicate();

export const fibMemoization = {};

export const fib = (index: number) => {
    let a = 0;
    let b = 1;
    let c = 0;
    if (index === 0) { return 0; }
    if (index < 2) { return 1; }
    if (fibMemoization.hasOwnProperty(index)) {
        return fibMemoization[index];
    }
    for (let i = index; i !== 0; i -= 1) {
        c = a + b;
        a = b;
        b = c;
    }
    fibMemoization[index] = c;
    return c;
};

sub.on('message', (channel: string, message: string) => {
    const index = Number(message);
    redisClient.hset('values', message, fib(index));
    redisClient.lset('totals', index, fib(index));
});
sub.subscribe('insert');