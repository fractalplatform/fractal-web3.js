// eslint-disable-next-line unicorn/filename-case
import functions from '../src/Utils';

test('isEmptyObj', () => {
    expect(functions.isEmptyObj()).toBe(true);
    var y = String('test');
    expect(functions.isEmptyObj(y)).toBe(false);
    expect(functions.isEmptyObj('test')).toBe(false);
});

test('hex2Bytes', () => {
    var result = new Uint8Array([230, 181, 139, 232, 175, 149]);
    expect(functions.hex2Bytes('0xe6b58be8af95')).toStrictEqual(result);
});
