
const redis = require('redis');
const client = redis.createClient();


const setCache = (key, value, callback) => {
    client.set(key, value, (err, reply) => {
        if (err) return callback(err);
        return callback(null, reply);
    });
};

// Get data from Redis cache
const getCache = (key, callback) => {
    client.get(key, (err, reply) => {
        if (err) return callback(err);
        return callback(null, reply);
    });
};

module.exports = {
    setCache,
    getCache
};
