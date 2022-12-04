const { createClient } = require('redis');
const {REDIS_CONF} = require('../conf/db')

// CREATE CLIENT
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

module.exports = redisClient;