let Protosphere = require('./index.js');
let long = require('long');
Protosphere.enableDebug();

let object1 = {
  testString: 'xemasiv',
  testInt: 23,
  testDouble: 23.123123,
  testLong: long.fromString('9223372036854775807'),
  testArray: [ 1, 2, 3 ],
  testObject: {
    key1: '1',
    key2: 2
  },
};
Protosphere.fromObject(object1)
  .then(console.log)
  .then(console.error);
