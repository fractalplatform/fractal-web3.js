import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import Hash from 'eth-lib/lib/hash';
import {toBuffer, stripZeros} from 'ethereumjs-util';
import numberToBN from 'number-to-bn';

var assert = require('assert');

/**
 * Takes an input and transforms it into an BN
 *
 * @method toBN
 *
 * @param {Number|String|BN} number, string, HEX string or BN
 *
 * @returns {BN} BN
 */
export const toBN = (number) => {
    try {
        return numberToBN(number);
    } catch (error) {
        throw new Error(`${error} Given value: "${number}"`);
    }
};

/**
 * Converts value to it's number representation
 *
 * @method hexToNumber
 *
 * @param {String|Number|BN} value
 *
 * @returns {Number}
 */
export const hexToNumber = (value) => {
    if (!value) {
        return value;
    }

    return toBN(value).toNumber();
};

/**
 * Convert a byte array to a hex string
 *
 * Note: Implementation from crypto-js
 *
 * @method bytesToHex
 *
 * @param {Array} bytes
 *
 * @returns {String} the hex string
 */

export const bytesToHex = (bytes) => {
    let hex = [];

    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xf).toString(16));
    }

    return `0x${hex.join('').replace(/^0+/, '')}`;
};

/**
 * Convert a hex string to a byte array
 *
 * Note: Implementation from crypto-js
 *
 * @method hexToBytes
 *
 * @param {String} hex
 *
 * @returns {Array} the byte array
 */
export const hexToBytes = (hex) => {
    hex = hex.toString(16);

    if (!isHexStrict(hex)) {
        throw new Error(`Given value "${hex}" is not a valid hex string.`);
    }

    hex = hex.replace(/^0x/i, '');
    hex = hex.length % 2 ? '0' + hex : hex;

    let bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }

    return bytes;
};

/**
 * Check if string is HEX, requires a 0x in front
 *
 * @method isHexStrict
 *
 * @param {String} hex to be checked
 *
 * @returns {Boolean}
 */
export const isHexStrict = (hex) => {
    return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
};

/**
 * Check if string is HEX
 *
 * @method isHex
 *
 * @param {String} hex to be checked
 *
 * @returns {Boolean}
 */
export const isHex = (hex) => {
    return (isString(hex) || isNumber(hex)) && /^(-0x|0x)?[0-9a-f]*$/i.test(hex);
};

/**
 * Hashes values to a keccak256 hash using keccak 256
 *
 * To hash a HEX string the hex must have 0x in front.
 *
 * @method keccak256
 * @return {String} the keccak256 string
 */
const KECCAK256_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

export const keccak256 = (value) => {
    if (isHexStrict(value) && /^0x/i.test(value.toString())) {
        value = hexToBytes(value);
    }

    const returnValue = Hash.keccak256(value); // jshint ignore:line

    if (returnValue === KECCAK256_NULL_S) {
        return null;
    } else {
        return returnValue;
    }
};
// expose the under the hood keccak256
keccak256._Hash = Hash;

/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param self the `Object` to define properties on
 * @param fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param data data to be validated against the definitions
 */

export function DefineProperties(self, fields, data) {
    self.raw = [];
    self._fields = [];

    fields.forEach(function(field, i) {
        self._fields.push(field.name);
        function getter() {
            return self.raw[i];
        }

        function setter(v) {
            if (field.name === 'from' || field.name === 'to' || field.name === 'remark') {
                v = Buffer.from(v);
            } else {
                v = toBuffer(v);
            }

            //  console.log('----->', field.name, field.allowZero, field.length, v.length);

            if (field.allowLess && field.length !== undefined) {
                v = stripZeros(v);
                assert(
                    field.length >= v.length,
                    'The field ' + field.name + ' must not have more ' + field.length + ' bytes'
                );
            } else if (!(field.allowZero && v.length === 0) && field.length !== undefined) {
                assert(
                    field.length === v.length,
                    'The field ' + field.name + ' must have byte length of ' + field.length
                );
            }
            self.raw[i] = v;
        }

        Object.defineProperty(self, field.name, {
            enumerable: true,
            configurable: true,
            get: getter,
            set: setter
        });
    });

    // if the constuctor is passed data
    if (data) {
        // if (typeof data === 'string') {
        //     data = Buffer.from(ethjsUtil.stripHexPrefix(data), 'hex');
        // }

        // if (Buffer.isBuffer(data)) {
        //     data = rlp.decode(data);
        // }

        if (Array.isArray(data)) {
            if (data.length > self._fields.length) {
                throw new Error('wrong number of fields in data');
            }
            // make sure all the items are buffers
            data.forEach(function(d, i) {
                self[self._fields[i]] = toBuffer(d);
            });
        } else if (typeof data === 'object') {
            var keys = Object.keys(data);
            fields.forEach(function(field) {
                if (keys.includes(field.name)) self[field.name] = data[field.name];
                if (keys.includes(field.alias)) self[field.alias] = data[field.alias];
            });
        } else {
            throw new TypeError('invalid data');
        }
    }
}

/**
 * Gets the r,s,v values from a signature
 *
 * @method getSignatureParameters
 *
 * @param {String} ECDSA signature
 *
 * @return {Object} with r,s,v values
 */
export const getSignatureParameters = (signature) => {
    if (!isHexStrict(signature)) {
        throw new Error(`Given value "${signature}" is not a valid hex string.`);
    }

    const r = signature.slice(0, 66);
    const s = `0x${signature.slice(66, 130)}`;
    let v = `0x${signature.slice(130, 132)}`;
    v = hexToNumber(v);

    // if (![27, 28].includes(v)) v += 27;

    return {
        r,
        s,
        v
    };
};

export default {
    bytesToHex,
    keccak256,
    DefineProperties,
    hexToBytes,
    hexToNumber,
    isHexStrict,
    isHex,
    getSignatureParameters
};
