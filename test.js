let Protosphere = require('./index.js');
Protosphere.enableDebug();

let object1 = {
  name: 'xemasiv',
  sampleInt: 23,
  sampleDouble: 23.123123,
  sampleArray: [ 1, 2, 3 ],
  sampleObject: {
    key1: '1',
    key2: 2
  },
};
Protosphere.fromObject(object1)
  .then(console.log)
  .then(console.error);
