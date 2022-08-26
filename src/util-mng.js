const util = require('util');

async function utilFormat() {
  console.log(util.format('%s:%s', 'foo'));
  console.log(util.format('%s:%s', 'foo', 'bar', 'baz'));
  console.log(util.format(1, 2, 3));
}

async function utilDebug() {
  util.debug('message on stderr');
}

async function utilLog() {
  util.log('Timestamped message.');
}

async function utilInspect() {
  console.log(util.inspect(util, true, null));
}

async function utilPromisify(syncFunc, param) {
//  console.log("utilPromisify :: ", param);

  const newPromise = await util.promisify(syncFunc);
  
//  console.log("newPromise :: ", newPromise);

  newPromise(param)
    .then(msg => {
      console.log("promisify : ", msg);
    })
    .catch(err => {
      console.log(err)
    })
//  console.log("Called newPromise");
}

module.exports = {
  utilFormat,
  utilDebug,
  utilLog,
  utilInspect,
  utilPromisify
};