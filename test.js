let Protosphere = require('./index.js');
let long = require('long');
Protosphere.enableDebug();

let object1 = {
  testEmptyArray: [],
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
  testNestedArray: [
    [1,2,3],
    [1,2,3]
  ],
  testNestedObject: {
    nest1: {
      hi: 'hello!'
    }
  }
};
Protosphere.obj2buff(object1)
  .then((buffer) => {
    console.log('length:', buffer.length);
    return Protosphere.buff2obj(buffer);
  })
  .then((finalObject) => console.log(finalObject))
  .catch(console.error);
