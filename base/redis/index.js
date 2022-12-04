const redis = require('redis');

// 创建
const client = redis.createClient({
  url: `redis://127.0.0.1:6379`
});


client.on('error', err => {
  console.log(err)
})

// 连接
client.connect()
  .then(async () => {

    // 设值
    await client.set('name', 'leo1');
    // 取值
    await client.get('name');
    // 摧毁
    await client.quit();

  });

const set = (k, v) => {
  if (typeof v === 'object') {
    v = JSON.stringify(v);
  }
  client.set(k, v);
}

const get = (k) => {
  return new Promise((resolve, reject) => {
    let val;   
    try {
      val = client.get(k);
    } catch (err) {
      reject(err);
      return;
    }

    if (val === null) {
      resolve(null)
      return;
    }
    
    try {
      resolve(JSON.parse(val))
    } catch {
      resolve(val)
    }
  })
}

module.exports = {
  set, get
}

