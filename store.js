var scRedis = require('sc-redis');

module.exports.run = function (store) {
  console.log('   >> Store PID:', process.pid);

  scRedis.attach(store);
};
