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

let schema = {
  name: Protosphere.String(),
  details: Protosphere.Object({
    verified: Protosphere.Boolean()
  }),
  age: Protosphere.Integer(),
  bitcoins: Protosphere.Double(),
  memberships: Protosphere.Array(
    Protosphere.String()
  ),
  coinPairs: Protosphere.Array(
    Protosphere.Array(
      Protosphere.String()
    )
  ),
  configs: Protosphere.Object({
    video: Protosphere.Object({
      hue: Protosphere.Integer(),
      saturation: Protosphere.Integer()
    }),
    audio: Protosphere.Object({
      volume: Protosphere.Double()
    })
  }),

  undefinedBoolean: Protosphere.Boolean(),
  nullBoolean: Protosphere.Boolean(),
  errorBoolean: Protosphere.Boolean(),

  undefinedString: Protosphere.String(),
  nullString: Protosphere.String(),
  errorString: Protosphere.String(),

  undefinedInteger: Protosphere.Integer(),
  nullInteger: Protosphere.Integer(),
  errorInteger: Protosphere.Integer(),

  undefinedDouble: Protosphere.Double(),
  nullDouble: Protosphere.Double(),
  errorDouble: Protosphere.Double(),

  undefinedArray: Protosphere.Array(),
  nullArray: Protosphere.Array(),
  errorArray: Protosphere.Array(),

  undefinedObject: Protosphere.Object(),
  nullObject: Protosphere.Object(),
  errorObject: Protosphere.Object(),
};
let values = {
  name: 'Xemasiv',
  details: {
    verified: true
  },
  isNull: null,
  isUndefined: undefined,
  age: Math.pow(2, 50),
  bitcoins: 0.9999999999999991,
  memberships: ['Amex', 'Mastercard'],
  coinPairs: [
    ['USD', 'BTC'],
    ['EUR', 'BTC']
  ],
  configs: {
    video: {
      hue: 50,
      saturation: 70
    },
    audio: {
      volume: 95.50
    }
  },
  undefinedBoolean: undefined,
  nullBoolean: null,
  undefinedString: undefined,
  nullString: null,
  undefinedInteger: undefined,
  nullInteger: null,
  undefinedDouble: undefined,
  nullDouble: null,
  undefinedArray: undefined,
  nullArray: null,
  undefinedObject: undefined,
  nullObject: null,
  // errorObject: 'sample string for error',
  // errorArray: 'sample string for error',
  // errorDouble: 'sample string for error',
  // errorInteger: 'sample string for error',
  // errorString: 123
  // errorBoolean: 123
};

Protosphere.disect(schema, values);

const toPairs = require('lodash/fp/toPairs');
const sortBy = require('lodash/fp/sortBy');
const fromPairs = require('lodash/fp/fromPairs');
const sortObject = (object) => fromPairs(sortBy(0)(toPairs(object)));
