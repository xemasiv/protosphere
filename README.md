# protosphere
:clap: PROTOCOL :clap: BUFFERS :clap: MADE :clap: EASY :clap:

## Changelog

* v2.x
  * Added dist builds:
    * `protosphere.min.js`
    * `protosphere.core.min.js`
* v1.x
  * Fully functional
* v0.x
  * Testing

## Usage

```
npm install protosphere --save
yarn add protosphere
```
```
const Protosphere = require('protosphere');
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
