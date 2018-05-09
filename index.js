const pbf = require('pbf');
const long = require('long');
const debug = require('debug')('Protosphere');
const warn = require('debug')('Protosphere warning');
warn.enabled = true;
let errors = [
  'Invalid parameter received.'
];
const classify = (subject) => {
  switch (typeof subject) {
    case 'string':
      return 'string';
      break;
    case 'number':
      if (isNaN(subject) === true) return 'nan';
      if (isFinite(subject) === false) return 'infinity';
      if (Number.isInteger(subject) === false) return 'double';
      return 'integer';
      break;
    case 'undefined':
      return 'undefined';
      break;
    case 'boolean':
      return 'boolean';
      break;
    case 'function':
      return 'function';
      break;
    case 'object':
      if (subject === null) return 'null';
      switch (subject.__proto__) {
        case undefined:
          return undefined;
          break;
        case long.prototype:
          return 'long';
          break;
        case Object.prototype:
          return 'object';
          break;
        case Array.prototype:
          return 'array';
          break;
        case Error.prototype:
          return 'error';
          break;
        case Promise.prototype:
          return 'promise';
          break;
        case Date.prototype:
          return 'date';
          break;
        case RegExp.prototype:
          return 'regexp';
          break;
        case Map.prototype:
          return 'map';
          break;
        case Set.prototype:
          return 'set';
          break;
        case WeakMap.prototype:
          return 'weakmap';
          break;
        case WeakSet.prototype:
          return 'weakset';
          break;
        case ArrayBuffer.prototype:
          return 'arraybuffer';
          break;
        case DataView.prototype:
          return 'dataview';
          break;
        // -128 to 127; 1 byte; byte; int8_t
        // 8-bit two's complement signed integer
        case Int8Array.prototype:
          return 'int8array';
          break;
        // 0 to 255; 1 byte; octet; uint8_t
        // 8-bit unsigned integer
        case Uint8Array.prototype:
          return 'uint8array';
          break;
        // 0 to 255; 1 byte; octet; uint8_t
        // 8-bit unsigned integer (clamped)
        case Uint8ClampedArray.prototype:
          return 'uint8clampedarray';
          break;
        // -32768 to 32767; 2 bytes; short; int16_t
        // 16-bit two's complement signed integer
        case Int16Array.prototype:
          return 'int16array';
          break;
        // 0 to 65535; 2 bytes; unsigned short; uint16_t
        // 16-bit unsigned integer
        case Uint16Array.prototype:
          return 'uint16array';
          break;
        // -2147483648 to 2147483647; 4 bytes; long; int32_t
        // 32-bit two's complement signed integer
        case Int32Array.prototype:
          return 'int32array';
          break;
        // 0 to 4294967295; 4 bytes; unsigned long; uint32_t
        // 32-bit unsigned integer
        case Uint32Array.prototype:
          return 'uint32array';
          break;
        // 1.2x10-38 to 3.4x1038; 4 bytes; unrestricted float; float
        // 32-bit IEEE floating point number ( 7 significant digits e.g. 1.1234567)
        case Float32Array.prototype:
          return 'float32array';
          break;
        // 5.0x10-324 to 1.8x10308; 8 bytes; unrestricted double; double
        // 64-bit IEEE floating point number (16 significant digits e.g. 1.123...15)
        case Float64Array.prototype:
          return 'float64array';
          break;
        default:
          return undefined;
          break;
      }
      break;
    default:
      return undefined;
      break;
  }
};
/*
Supported types:
String
Number(Varint)

Notes:
6553565535
2147483647
writePackedSFixed32 readPackedSFixed32    -2147483648  2147483647
writePackedFixed32  readPackedFixed32      0            4294967295
9007199254740991
      4294967295
      999999999999999
      999999999999999
*/
const concat = (...args) => {
  let str = '';
  args.map((arg, index) => str = str.concat(String(arg)));
  return str;
};
const VALUE_TYPES = {
  BOOLEAN: 1,
  DOUBLE: 2,
  INTEGER: 3,
  STRING: 4,
  BYTES: 5,
  ARRAY_START: 6,
  ARRAY_END: 7,
  OBJECT_START: 8,
  OBJECT_END: 9
};
class Protosphere {
  static fromObject (parameter) {
    return new Promise((resolve, reject) => {
      if (classify(parameter) !== 'object') reject(errors[0]);
      debug('OBJECT ok');
      // tag === 1, genesis

      // destructure genesis
      // genesis = genesis.split(' ');

      // hasBooleans = false
      // hasDoubles = false
      // hasVarints = false
      // hasBooleans = false

      // hasStrings = false
      // hasBytes = false

      // stringStart = 2;
      // stringEnd = 0;
      // byteStart = 2;
      // byteEnd = 0;

      // genesis[0] === if we have booleans
        // ? stringStart++, byteStart++, hasBooleans = true
      // genesis[1] === if we have doubles
        // ? stringStart++, byteStart++, hasDoubles = true
      // genesis[2] === if we have varints
        // ? stringStart++, byteStart++, hasVarints = true

      // genesis[3] === if we have strings, how many string fields do we have
        // ? byteStart++, hasStrings = true, stringEnd = genesis[3]
      // genesis[4] === if we have bytes, how many bytes fields do we have
        // ? hasBytes = true, byteEnd = genesis[4]

      // genesis[5 to n], made of two parts, concatenated.
        // key    --> s0
        // value
        //    --> b1, if boolean
        //    --> d1, if double
        //    --> i1, if integer
        //    --> [, if array start
        //    --> ], if array end
        //    --> {, if object start
        //    --> }, if object end
      const exodus = [];
      const booleans = [];
      const doubles = [];
      const integers = [];
      const strings = [];
      const bytes = [];
      const traverse = (obj) => {
        debug(Object.keys(obj));
        Object.keys(obj).map((key) => {
          let val = obj[key];
          debug(key, val, classify(val));
          switch (classify(val)) {
            case 'boolean':
              if (booleans.includes(val) === false) booleans.push(val);
              if (strings.includes(key) === false) strings.push(key);
              exodus.push([strings.indexOf(key), VALUE_TYPES.BOOLEAN, booleans.indexOf(val)]);
              break;
            case 'double':
              if (doubles.includes(val) === false) doubles.push(val);
              if (strings.includes(key) === false) strings.push(key);
              exodus.push([strings.indexOf(key), VALUE_TYPES.DOUBLE, doubles.indexOf(val)]);
              break;
            case 'integer':
              if (long.fromNumber(val).getNumBitsAbs() >= 50) {
                warn('@ key', key, '@ val', val);
                warn('raw >= 50 bit int currently unsafe w/o long.js support.');
              }
              if (integers.includes(val) === false) integers.push(val);
              if (strings.includes(key) === false) strings.push(key);
              exodus.push([strings.indexOf(key), VALUE_TYPES.INTEGER, integers.indexOf(val)]);
              break;
            case 'string':
              if (strings.includes(val) === false) strings.push(val);
              if (strings.includes(key) === false) strings.push(key);
              exodus.push([strings.indexOf(key), VALUE_TYPES.INTEGER, strings.indexOf(val)]);
              break;
            case 'array':
              if (strings.includes(key) === false) strings.push(key);
              exodus.push([strings.indexOf(key), VALUE_TYPES.ARRAY_START]);
              traverse(val);
              exodus.push([strings.indexOf(key), VALUE_TYPES.ARRAY_END]);
              break;
            case 'object':
              if (strings.includes(key) === false) strings.push(key);
              exodus.push([strings.indexOf(key), VALUE_TYPES.OBJECT_START]);
              traverse(val);
              exodus.push([strings.indexOf(key), VALUE_TYPES.OBJECT_END]);
              break;
          }
        });
      };
      traverse(parameter);
      let genesis = concat(
        booleans.length ? 1 : 0,
        doubles.length ? 1 : 0,
        integers.length ? 1 : 0,
        strings.length ? 1 : 0,
        bytes.length ? 1 : 0,
        ' ', exodus.length,
        ' ', strings.length,
        ' ', bytes.length
      );

      debug('exodus:', exodus);
      debug('booleans:', booleans);
      debug('doubles:', doubles);
      debug('integers:', integers);
      debug('strings:', strings);
      debug('bytes:', bytes);
      debug('genesis:', genesis);

      let protobuf = new pbf();
      let next = 0;

      next++;
      protobuf.writeStringField(next, genesis)

      if (booleans.length) {
        next++;
        protobuf.writePackedBoolean(next, booleans);
      };

      if (doubles.length) {
        next++;
        protobuf.writePackedDouble(next, doubles);
      };

      if (integers.length) {
        next++;
        protobuf.writePackedSVarint(next, integers);
      };


      next++
      debug('starting @', next);
      for (next; next <= 5; next++) {
        debug('writing @', next);
      };
      debug('ended @', next - 1, 'next will be', next);

      let buffer = protobuf.finish();
      debug('final buffer length:', buffer.length);
      resolve(buffer);
    });
  }
  static fromBuffer () {

  }
  static enableDebug () {
    debug.enabled = true;
    debug('DEBUG enabled.');
  }
}
if (typeof module === 'object') {
	module.exports = Protosphere;
} else if (typeof window === 'object') {
		window.Protosphere = Protosphere;
}
