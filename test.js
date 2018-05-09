let Protosphere = require('./index.js');
Protosphere.enableDebug();

let object1 = {
  name: 'xemasiv',
  age: 23,
  array: [ 1, 2, 3 ],
  object: {
    key1: '1',
    key2: 2
  },
};
Protosphere.fromObject(object1)
  .then(console.log)
  .then(console.error);
