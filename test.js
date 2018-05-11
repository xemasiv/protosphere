const Protosphere = require('./index.js');
const inspect = (...parameters) => parameters.map((parameter) => {
  console.dir(parameter, { depth:null, colors: true })
});
const ps = new Protosphere({
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
});

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

ps.transform(values)
  .then((buffer) => {
    console.log('transformed result buffer byteLength:', buffer.byteLength);
    return ps.hydrate(buffer);
  })
  .then((result) => {
    console.log('hydrated result:');
    inspect(result);
  });
