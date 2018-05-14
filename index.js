const pbf = require('pbf');
const mapKeys = require('lodash/fp/mapKeys');
const toPairs = require('lodash/fp/toPairs');
const sortBy = require('lodash/fp/sortBy');
const fromPairs = require('lodash/fp/fromPairs');
const sortObject = (object) => fromPairs(sortBy(0)(toPairs(object)));
// schema = _(schema).toPairs().sortBy(0).fromPairs().value();

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
const concat = (...args) => {
  let str = '';
  args.map((arg, index) => str = str.concat(String(arg)));
  return str;
};
const concats = (...args) => {
  let str = '';
  args.map((arg, index) => {
    str = index === 0 ? String(arg) : str.concat(' ', String(arg));
  });
  return str;
};
const stringify = (arg) => JSON.stringify(arg, null, 2);
const fillArray = (withThis, length) => {
  var arr = new Array(length);
  for (var i = 0; i < length; i++) {
    arr[i] = withThis;
  }
  return arr;
}
let inspect = () => {};

class BooleanSchema {
  constructor () {
    this.type = 'boolean';
  }
}
class StringSchema {
  constructor () {
    this.type = 'string';
  }
}
class IntegerSchema {
  constructor () {
    this.type = 'integer';
  }
}
class DoubleSchema {
  constructor () {
    this.type = 'double';
  }
}
class ObjectSchema {
  constructor (contents) {
    this.type = 'object';
    this.contents = sortObject(contents);
  }
}
class ArraySchema {
  constructor (schema) {
    this.type = 'array';
    this.schema = schema;
  }
}

class Protosphere {
  constructor (schema) {
    schema = sortObject(schema);
    this.schema = schema;
  }
  transform (values) {
    const schema = this.schema;
    return new Promise((resolve, reject) => {
      try {
        // inspect(schema);
        // on transform, we push() to arrays,
        // on hydrate, we shift() from arrays
        const arrays = [];
        const strings = [];
        const booleans = [];
        const integers = [];
        const doubles = [];
        const nulls = [];
        const undefineds = [];
        const nans = [];
        const infinitys = [];
        let inputs = 0;
        const traverse = (schema, values) => {

          inspect(schema);

          mapKeys((key) => {
            inputs++;
            let s = schema[key];
            let v = values[key];
            /*
            if (s.type !== classify(v)) {

            } */
            switch (s.type) {
              case 'boolean':
                switch (classify(v)) {
                  case 'boolean':
                    booleans.push(v);
                    break;
                  case 'null':
                    nulls.push(inputs);
                    break;
                  case 'undefined':
                    undefineds.push(inputs);
                    break;
                  default:
                    throw new TypeError(
                      concats('Unexpected', classify(v), 'on', s.type, 'field @', key, 'of', stringify(values))
                    );
                    break;
                }
                break;
              case 'string':
                switch (classify(v)) {
                  case 'string':
                    strings.push(v);
                    break;
                  case 'null':
                    nulls.push(inputs);
                    break;
                  case 'undefined':
                    undefineds.push(inputs);
                    break;
                  default:
                    throw new TypeError(
                      concats('Unexpected', classify(v), 'on', s.type, 'field @', key, 'of', stringify(values))
                    );
                    break;
                }
                break;
              case 'integer':
                switch (classify(v)) {
                  case 'integer':
                    integers.push(v);
                    break;
                  case 'null':
                    nulls.push(inputs);
                    break;
                  case 'undefined':
                    undefineds.push(inputs);
                    break;
                  default:
                    throw new TypeError(
                      concats('Unexpected', classify(v), 'on', s.type, 'field @', key, 'of', stringify(values))
                    );
                    break;
                }
                break;
              case 'double':
                switch (classify(v)) {
                  case 'double':
                    doubles.push(v);
                    break;
                  case 'null':
                    nulls.push(inputs);
                    break;
                  case 'undefined':
                    undefineds.push(inputs);
                    break;
                  default:
                    throw new TypeError(
                      concats('Unexpected', classify(v), 'on', s.type, 'field @', key, 'of', stringify(values))
                    );
                    break;
                }
                break;
              case 'array':
                switch (classify(v)) {
                  case 'array':
                    if (s.schema) {
                      arrays.push(v.length);
                      traverse(fillArray(s.schema, v.length), v);
                    }
                    break;
                  case 'null':
                    nulls.push(inputs);
                    break;
                  case 'undefined':
                    undefineds.push(inputs);
                    break;
                  default:
                    throw new TypeError(
                      concats('Unexpected', classify(v), 'on', s.type, 'field @', key, 'of', stringify(values))
                    );
                    break;
                }
                break;
              case 'object':
                switch (classify(v)) {
                  case 'object':
                    traverse(s.contents, v);
                    break;
                  case 'null':
                    nulls.push(inputs);
                    break;
                  case 'undefined':
                    undefineds.push(inputs);
                    break;
                  default:
                    throw new TypeError(
                      concats('Unexpected', classify(v), 'on', s.type, 'field @', key, 'of', stringify(values))
                    );
                    break;
                }
                break;
            }

          })(schema);
        };
        traverse(schema, values);
        let genesis = concat(
          arrays.length ? 1 : 0,
          booleans.length ? 1 : 0,
          integers.length ? 1 : 0,
          doubles.length ? 1 : 0,
          nulls.length ? 1 : 0,
          undefineds.length ? 1 : 0,
          nans.length ? 1 : 0,
          infinitys.length ? 1 : 0,
          strings.length ? 1 : 0,
          ' ', strings.length
        );











        let protobuf = new pbf();
        let next = 0;

        next++;
        protobuf.writeStringField(next, genesis)
        if (arrays.length) {
          next++;
          protobuf.writePackedVarint(next, arrays);
        };
        if (booleans.length) {
          next++;
          protobuf.writePackedBoolean(next, booleans);
        };
        if (integers.length) {
          next++;
          protobuf.writePackedSVarint(next, integers);
        };
        if (doubles.length) {
          next++;
          protobuf.writePackedDouble(next, doubles);
        };
        if (nulls.length) {
          next++;
          protobuf.writePackedVarint(next, nulls);
        };
        if (undefineds.length) {
          next++;
          protobuf.writePackedVarint(next, undefineds);
        };
        if (nans.length) {
          next++;
          protobuf.writePackedVarint(next, nans);
        };
        if (infinitys.length) {
          next++;
          protobuf.writePackedVarint(next, infinitys);
        };
        if (strings.length) {
          for (var i = 0; i <= strings.length - 1; i++) {
            next++
            protobuf.writeStringField(next, strings[i]);
          }
        };
        let buffer = protobuf.finish();
        resolve(buffer);
      } catch (e) {
        reject(e);
      }
    });
  }
  hydrate (buffer) {
    const schema = this.schema;
    return new Promise((resolve, reject) => {
      try {
        if (classify(buffer) !== 'uint8array') {
          buffer = new Uint8Array(buffer);
        }
        let genesis, switches, overhead,
        arrays, booleans, integers, doubles,
        nulls, undefineds, nans, infinitys,
        strings, stringCount, hasStrings;
        let handlers = [];
        const reader = (tag, data, pbf) => {
          if (tag === 1) {
            genesis = pbf.readString().split(' ');
            switches = genesis[0].split('').map((x) => parseInt(x));
            stringCount = parseInt(genesis[1]);



            if (stringCount > 0) {
              strings = [];
            }
            overhead = 0;
            if (switches[0]) {

              overhead++;
              handlers.push((pbf) => {
                arrays = pbf.readPackedVarint();
              });
            }
            if (switches[1]) {

              overhead++;
              handlers.push((pbf) => {
                booleans = pbf.readPackedBoolean();
              });
            }
            if (switches[2]) {

              overhead++;
              handlers.push((pbf) => {
                integers = pbf.readPackedSVarint();
              });
            }
            if (switches[3]) {

              overhead++;
              handlers.push((pbf) => {
                doubles = pbf.readPackedDouble();
              });
            }
            if (switches[4]) {

              overhead++;
              handlers.push((pbf) => {
                nulls = pbf.readPackedVarint();
              });
            }
            if (switches[5]) {

              overhead++;
              handlers.push((pbf) => {
                undefineds = pbf.readPackedVarint();
              });
            }
            if (switches[6]) {

              overhead++;
              handlers.push((pbf) => {
                nans = pbf.readPackedVarint();
              });
            }
            if (switches[7]) {

              overhead++;
              infinitys.push((pbf) => {
                infinitys = pbf.readPackedVarint();
              });
            }

            hasStrings = switches[8] ? true : false;


          } else {
            if (tag <= (1 + overhead)) {
              var handler = handlers.shift();
              handler(pbf);
              return;
            } else {
              if (tag <= (1 + overhead + stringCount)) {
                strings.push(pbf.readString());
              }
            }
          }
        }
        new pbf(buffer).readFields(reader);
        let outputs = 0;
        const reverse = (schema, object) => {
          mapKeys((key) => {
            outputs++;
            let s = schema[key];
            switch (s.type) {
              case 'boolean':
                if (typeof undefineds !== 'undefined' && undefineds.includes(outputs)) {
                  object[key] = undefined;
                } else if (typeof nulls !== 'undefined' && nulls.includes(outputs)) {
                  object[key] = null;
                } else {
                  object[key] = booleans.shift();
                }
                break;
              case 'string':
                if (typeof undefineds !== 'undefined' && undefineds.includes(outputs)) {
                  object[key] = undefined;
                } else if (typeof nulls !== 'undefined' && nulls.includes(outputs)) {
                  object[key] = null;
                } else {
                  object[key] = strings.shift();
                }
                break;
              case 'integer':
                if (typeof undefineds !== 'undefined' && undefineds.includes(outputs)) {
                  object[key] = undefined;
                } else if (typeof nulls !== 'undefined' && nulls.includes(outputs)) {
                  object[key] = null;
                } else {
                  object[key] = integers.shift();
                }
                break;
              case 'double':
                if (typeof undefineds !== 'undefined' && undefineds.includes(outputs)) {
                  object[key] = undefined;
                } else if (typeof nulls !== 'undefined' && nulls.includes(outputs)) {
                  object[key] = null;
                } else {
                  object[key] = doubles.shift();
                }
                break;
              case 'array':
                if (typeof undefineds !== 'undefined' && undefineds.includes(outputs)) {
                  object[key] = undefined;
                } else if (typeof nulls !== 'undefined' && nulls.includes(outputs)) {
                  object[key] = null;
                } else {
                  let arrayLength = arrays.shift();
                  object[key] = new Array(arrayLength);
                  reverse(fillArray(s.schema, arrayLength), object[key]);
                }
                break;
              case 'object':
                if (typeof undefineds !== 'undefined' && undefineds.includes(outputs)) {
                  object[key] = undefined;
                } else if (typeof nulls !== 'undefined' && nulls.includes(outputs)) {
                  object[key] = null;
                } else {
                  object[key] = {};
                  reverse(s.contents, object[key]);
                }
                break;
            }

          })(schema);
          return object;
        };
        let reversed = reverse(schema, {});









        inspect(reversed);
        resolve(reversed);
      } catch (e) {
        reject(e);
      }
    });
  }
  static Boolean () {
    return new BooleanSchema();
  }
  static String () {
    return new StringSchema();
  }
  static Integer () {
    return new IntegerSchema();
  }
  static Double () {
    return new DoubleSchema();
  }
  static Object (contents) {
    return new ObjectSchema(contents);
  }
  static Array (schema) {
    return new ArraySchema(schema);
  }
  static enableInspect () {
    inspect = (...parameters) => parameters.map((parameter) => {
      console.dir(parameter, { depth:null, colors: true })
    });
  }
}
if (typeof window !== 'undefined') {
  window.Protosphere = Protosphere;
} else if (typeof module !== 'undefined') {
  module.exports = Protosphere;
}
// (debug)\(.*\;
/*
const debug = (...parameters) => {
  if (parameters.length >= 2) {
    console.log.apply(null, parameters);
  } else {
    parameters.map((parameter) => {
      console.dir(parameter, {depth:null, colors: true});
    });
  }
}; */
