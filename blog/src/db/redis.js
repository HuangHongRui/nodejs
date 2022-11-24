const { createClient } = require('redis');
const { REDIS_CONF } = require('../conf/db')

const client = createClient({
  url: `redis://${REDIS_CONF.host}:${REDIS_CONF.port}`
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

const set = (k, v) => {
  if (typeof v === 'object') {
    v = JSON.stringify(v);
  }
  client.set(k, v);
}

const get = (k) => {
  const promise = new Promise((resolve, reject) => {
    let val;
    try {
      val = client.get(k);
    } catch (err) {
      reject(err)
      return;
    }

    if (val === null) {
      resolve(null)
      return;
    }

    try {
      resolve(JSON.parse(val))
    } catch (err) {
      resolve(val)
    }
  })
  return promise
}

module.exports = {
  set,
  get
}