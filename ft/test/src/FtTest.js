import * as functions from '../../..';
import {HttpProvider} from '../../../ft-provider/src/ProvidersModuleFactory';

describe('TransactionSigner', () => {
    const chainID = 1;

    let signer;

    beforeEach(() => {
        signer = new functions.TransactionSigner(chainID);
    });

    it('constructor check', () => {
        expect(signer.chainID).toStrictEqual(1);

        signer.chainID = 2;
        expect(signer.chainID).toStrictEqual(2);
    });

    it('calls sign and returns the expected resolved promise', async () => {
        const txdata = {
            type: 1,
            gasAssetID: 0,
            gasPrice: 1000000000,
            gasLimit: 1000000,
            nonce: 0,
            from: 'testsender',
            to: 'testrecipient',
            assetID: 0,
            value: 1,
            data: '0x74657374207061796c6f6164',
            remark: 'test remark'
        };
        const privateKey = '9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658';

        await expect(signer.sign('contract', txdata, privateKey)).resolves.toEqual({
            messageHash: '0x898609654eaa4860b907e6d302640c1008ca5fc21804fc28bb07da15717b9221',
            rawTransaction:
                '0xf88701f884e50180843b9aca00830f4240808a7465737473656e6465728d74657374726563697069656e7480018c74657374207061796c6f61648b746573742072656d61726bb8418511d15b86506b1d6b50f8cff905f837e9e8026908861df982e9a50f85d0c0e9481b0244b82d1b473f83f37f249800ebb28a938e21675113fe42e7ad0b5443af26',
            signature:
                '0x8511d15b86506b1d6b50f8cff905f837e9e8026908861df982e9a50f85d0c0e9481b0244b82d1b473f83f37f249800ebb28a938e21675113fe42e7ad0b5443af26',
            transactionHash: '0xc2d855afec6c2a69861c4525969b01736d55f721d5d33d52f6f3bda4ecb7772e'
        });
    });
});

describe('Ft create account', () => {
    const chainID = 1;
    let ft;
    let provider = HttpProvider();

    beforeEach(() => {
        ft = new functions.Ft(chainID, provider);
    });

    it('sendRawTransaction check', async () => {
        const account = 'fractaltest1';
        const privateKey = '289c2857d4598e37fb9647507e47a309d6133539bf21a8b9cb6df88fd5232032';
        const pubkey =
            '0x047db227d7094ce215c3a0f57e1bcc732551fe351f94249471934567e0f5dc1bf795962b8cccb87a2eb56b29fbe37d614e2f4c3c45b789ae4f1f51f4cb21972ffd';
        const desc = 'create account';

        const createAccountPayload = ft.payload.createAccount(account, pubkey, desc);

        const txdata = {
            type: 3,
            gasAssetID: 0,
            gasPrice: 100000000000,
            gasLimit: 3000000,
            nonce: 0,
            from: 'fractalfounder',
            to: 'fractalaccount',
            payloadType: 256,
            assetID: 0,
            value: 10000000000000000000000,
            data: createAccountPayload,
            remark: '测试'
        };

        await expect(ft.transactionSigner.sign('plugin', txdata, privateKey)).resolves.toEqual({
            messageHash: '0x0bc45eb4e3ba56a436319f7923bc0dec1deecb89b66584c97ffe26fae0963e79',
            rawTransaction:
                '0xf9023003f9022ceb038085174876e800832dc6c0808e6672616374616c666f756e6465728e6672616374616c6163636f756e74820100808a021e19e0c9bab2400000b901a445948fde000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000c6672616374616c74657374310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008430783034376462323237643730393463653231356333613066353765316263633733323535316665333531663934323439343731393334353637653066356463316266373935393632623863636362383761326562353662323966626533376436313465326634633363343562373839616534663166353166346362323139373266666400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e637265617465206163636f756e7400000000000000000000000000000000000086e6b58be8af95b841ca386eb2bdc69e73e51587ebbe9b81779a4dcac89c8ad3ca4ba156937b4c2c4b611ecbdbbf8760eab40d30ce7a5cb054e1aad685954f4d2c3e556eb14f55e33325',
            signature:
                '0xca386eb2bdc69e73e51587ebbe9b81779a4dcac89c8ad3ca4ba156937b4c2c4b611ecbdbbf8760eab40d30ce7a5cb054e1aad685954f4d2c3e556eb14f55e33325',
            transactionHash: '0x3c349ac6bca219b6ab8192f73f96456d16921ace211b2ff8a5e9a19fef8b8aa3'
        });
    });
});
