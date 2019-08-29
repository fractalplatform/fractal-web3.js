// eslint-disable-next-line unicorn/filename-case
import functions from '../src/Fractal';
import {Buffer} from 'buffer';

const tx = {};
tx.chainId = 1;
tx.gasAssetId = 0;
tx.gasPrice = 1000;
tx.actions = [];
const action = {};
action.actionType = 0;
action.accountName = 'accountname';
action.nonce = 0;
action.gasLimit = 100000;
action.toAccountName = 'toaccountname';
action.assetId = 0;
action.amount = 100;
action.payload = Buffer.from('sign tx test payload').toString('hex');
action.remark = Buffer.from('sign tx test remark');
tx.actions.push(action);

const privateKey = '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658';

const signature =
    '0x05a087e75d43d381581e81645560bc0a98a4b0ba79e4a99cec8c206a8ea25a314a234d84cec047de9f1fb3bc9738bebf152d286dda3bc6548c576e9860a350621c';

test('sign transaction', async () => {
    const temporarySignature = await functions.signTx(tx, privateKey);
    expect(temporarySignature).toBe(signature);
});

test('test recover transaction', async () => {
    const address = await functions.recoverSignedTx(tx, signature);
    expect(address).toBe('0xC08B5542D177ac6686946920409741463a15dDdB');
});
