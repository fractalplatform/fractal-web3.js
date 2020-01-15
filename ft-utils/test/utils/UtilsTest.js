import functions from '../../src/utils/Utils';

test('hexToBytes', () => {
    let result = [230, 181, 139, 232, 175, 149];
    expect(functions.hexToBytes('0xe6b58be8af95')).toStrictEqual(result);
});

test('bytesToHex', () => {
    let result = '0xe6b58be8af95';
    let bs = new Uint8Array([230, 181, 139, 232, 175, 149]);
    expect(functions.bytesToHex(bs)).toStrictEqual(result);
});
