let Protosphere = require('./index.js');
Protosphere.enableDebug();

let object1 = {
  name: 'xemasiv',
  age: 23,
  array: [],
  object: {},
  map: new Map()
};
Protosphere.fromObject(object1)
  .then(console.log)
  .then(console.error);
