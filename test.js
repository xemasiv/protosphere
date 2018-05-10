let Protosphere = require('./index.js');
let long = require('long');
Protosphere.enableDebug();

let object1 = {
  testBool1: true,
  testBool2: false,
  testString: 'xemasiv',
  testInt: 23,
  testDouble: 23.123123,
  testLong: long.fromString('9223372036854775807'),
  testUnsafe: 999999999999999,
  testArray: [ 1, 2, 3 ],
  testObject: {
    key1: '1',
    key2: 2
  },
};
Protosphere.fromObject(object1)
  .then((buffer) => Protosphere.fromBuffer(buffer))
  .then((finalObject) => console.log(finalObject))
  .catch(console.error);
