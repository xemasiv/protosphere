const Protosphere = require('./index.js');
const inspect = (...parameters) => parameters.map((parameter) => {
  console.dir(parameter, { depth:null, colors: true })
});
const ps = new Protosphere({
  hello: Protosphere.String(),
  time: Protosphere.Integer(),
  float: Protosphere.Double(),
  boolean: Protosphere.Boolean(),
  otherbool: Protosphere.Boolean(),
  null: Protosphere.String(),
  obj: Protosphere.Object({
    what: Protosphere.String()
  }),
  arr: Protosphere.Array(
    Protosphere.Integer()
  )
});

let values = {
	hello: "world!",
	time: 1234567890,
	float: 0.01234,
	boolean: true,
	otherbool: false,
	null: null,
	obj: {
		what: "that"
	},
	arr: [1,2,3]
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
// defeats https://github.com/dcodeIO/PSON
// on same data:
// PSON: 59 bytes
// protosphere: 57 bytes
