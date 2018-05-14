# protosphere
:clap: PROTOCOL :clap: BUFFERS :clap: MADE :clap: EASY :clap:

![](https://cdn.dribbble.com/users/253615/screenshots/4262872/planet-_shot-03_1x.png)

> Art by Nick DePasquale

> https://dribbble.com/shots/4262872-Space-and-Planets

## Changelog

* v4.x
  * Uses schemas (see examples).
  * Lodash-based object-key ordering for intelligent destructuring.
  * Adaptive buffer structure for present & absent values.
  * Added dist build: `protosphere.min.js`
* v0.x to v3.x
  * PoC testing, bad performance, barely functional

## Usage

#### Installing

```
npm install protosphere --save
yarn add protosphere
```

#### Sample Usage
* Create an instance with a schema:
```
const Protosphere = require('protosphere');
const ps = new Protosphere({
  name: Protosphere.String(),
  details: Protosphere.Object({
    verified: Protosphere.Boolean()
  }),
  age: Protosphere.Integer(),
  bitcoins: Protosphere.Double(),
  memberships: Protosphere.Array(
    Protosphere.String()
  )
});
```
* Prepare your values:
```
let values = {
  name: 'Xemasiv',
  details: {
    verified: true
  },
  age: Math.pow(2, 50),
  bitcoins: 0.9999999999999991,
  memberships: ['Amex', 'Mastercard']
};
```
* Transform these values to get the buffer:
```
ps.transform(values)
  .then((buffer) => console.log('buffer:', buffer));
```
* Send this buffer to anywhere in the world
* Rehydrate it upon receipt:
```
ps.hydrate(response.data)
  .then((values) => console.log('values:', values));
```

#### Accepted Schema Values:
* `Protosphere.Boolean()`
  * Accepts `true`, `false`, `null`, `undefined`
```
let ps = new Protosphere({
  isVerified: Protosphere.Boolean()
});
```
* `Protosphere.String()`
  * Accepts any strings, `null`, `undefined`
```
let ps = new Protosphere({
  name: Protosphere.String()
});
```
* `Protosphere.Integer()`
  * Accepts positive/negative integers, `null`, `undefined`
```
let ps = new Protosphere({
  age: Protosphere.Integer()
});
```
* `Protosphere.Double()`
  * Accepts floating points / doubles, `null`, `undefined`
```
let ps = new Protosphere({
  amount: Protosphere.Double()
});
```
* `Protosphere.Object({mapped: schemas})`
  * Accepts string keys and (schema) as values , `null`, `undefined`
```
let ps = new Protosphere({
  configs: Protosphere.Object({
    fullscreen: Protosphere.Boolean(),
    brightness: Protosphere.Integer()
  })
});
```
* `Protosphere.Array(schemas)`
  * Accepts one schema (even object schema) as value, `null`, `undefined`
```
let ps = new Protosphere({
  students: Protosphere.Array(
    Protosphere.Object({
      name: Protosphere.String(),
      height: Protosphere.Double()
    })
  )
});
```

#### Testing
* Provided example shows comparison between two requests:
* Req # 1: `axios` + `application/json`
* Req # 2: `axios` + `JSON.stringify` + `application/octet-stream`
* Req # 3: `axios` + `protosphere` + `application/octet-stream`
```
npm run playground
```
* A bare `test.js` is also provided.
```
npm test
```

## class `Protosphere`

`constructor (schema)`
* Takes
  * `object` - the schema to be used.

function `.transform(object)`
* Takes
  * `object` - the object with values to be transformed
* Returns
  * Promise.resolve(`buffer`) - result buffer
  * Promise.reject(`error`) - error from try catch

function `.hydrate(buffer)`
* Takes
  * `buffer` - the buffer to be hydrated
* Returns
  * Promise.resolve(`object`) - original object
  * Promise.reject(`error`) - error from try catch

## License

Attribution 4.0 International (CC BY 4.0)

* https://creativecommons.org/licenses/by/4.0/
* https://creativecommons.org/licenses/by/4.0/legalcode.txt

![cc](https://creativecommons.org/images/deed/cc_blue_x2.png) ![by](https://creativecommons.org/images/deed/attribution_icon_blue_x2.png)
