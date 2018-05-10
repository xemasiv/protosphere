# protosphere
:clap: PROTOCOL :clap: BUFFERS :clap: MADE :clap: EASY :clap:

## Changelog

* v3.x
  * Dropped support for >= 50-bit varints
  * Flattened reference tree for smaller footprint
  * Support for null values
  * Support for undefined values
  * Support for NaN values
  * Support for Infinity values
  * Support for nested arrays in arrays
  * Support for nested objects in objects
  * Support for nested arrays in objects
  * Support for nested objects in arrays
* v2.x
  * Added dist builds:
    * `protosphere.min.js`
* v1.x
  * Barely functional
* v0.x
  * PoC Testing

## Usage

#### Installing

```
npm install protosphere --save
yarn add protosphere
```
```
const Protosphere = require('protosphere');
```

#### Sample Usage
* Example using `buffer` from feross, and `axios`
* Server-side
```
Protosphere.obj2buff(object1)
.then((result) => {
  res.set('Content-Type', 'application/octet-stream');
  res.send(Buffer(result));
});
```
* Client-side
```
axios({
  method:'get',
  url:'/test',
  responseType:'arraybuffer'
})
.then((response) => Protosphere.buff2obj(Buffer(response.data)))
.then(console.log)
.catch(console.error);
```

## class `Protosphere`

static function `.obj2buff(object)`
* Takes
  * `object`
* Returns
  * Promise.resolve(`buffer`)
  * Promise.reject(`string`)

static function `.buff2obj(buffer)`
* Takes
  * `buffer`
* Returns
  * Promise.resolve(`object`)
  * Promise.reject(`string`)

## License

Attribution 4.0 International (CC BY 4.0)

* https://creativecommons.org/licenses/by/4.0/
* https://creativecommons.org/licenses/by/4.0/legalcode.txt

![cc](https://creativecommons.org/images/deed/cc_blue_x2.png) ![by](https://creativecommons.org/images/deed/attribution_icon_blue_x2.png)
