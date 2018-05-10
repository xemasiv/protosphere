const util = require('util')

let Protosphere = require('./index.js');

let object1 = {
  testNaN: NaN,
  testInfinity: Infinity,
  testNull: null,
  testUndefined: undefined,
  testEmptyArray: [],
  testBool1: true,
  testBool2: false,
  testString: 'xemasiv',
  testInt: 23,
  testDouble: 23.123123,
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
  },
  testNestedArrayInObject: {
    nest1: {
      nest2: [1, 2, 3]
    }
  },
  testNestedArrayInObject2: {
    nest1: [
      [1,2,3],
      [4,5,6]
    ]
  },
  testSuperNesting: {
    nest1: {
      nest2: {
        nest3: {
          nest4: [
            [1,2,3],
            [1,2,3]
          ]
        }
      }
    }
  },
  testSuperNesting2: [
    { hi: [1,2,3] },
    [
      [1,2,3,4,5],
      [6,7,8,9],
      [12, 3213, {hi: 'hello!'}, undefined, null, NaN, Infinity]
    ]
  ],
  arrayWithObjects: [
    { name: 'xema', surname: 'siv'},
    { name: 'xema', surname: 'siv'},
    { name: 'xema', surname: 'siv'},
    { name: 'xema', surname: 'siv'}
  ]
};
Protosphere.obj2buff(object1)
  .then((buffer) => {
    console.log('LENGTH:', buffer.length);
    return Protosphere.buff2obj(buffer);
  })
  .then((finalObject) => console.log('RESULT:', util.inspect(finalObject, false, null)))
  .catch(console.error);
