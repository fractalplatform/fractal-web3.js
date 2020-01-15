import {ContractTx, PluginTx} from '../../../ft-tx/src';
import * as Utils from '../../../ft-utils/src/utils/Utils';

export default class TransactionSigner {
    /**
     *
     *
     * @param {Number} chainID chain id
     *
     * @constructor
     */
    constructor(chainID) {
        this._chainID = chainID;
    }

    get chainID() {
        return this._chainID;
    }

    set chainID(chainID) {
        this._chainID = chainID;
    }

    /**
     * Add to be production build save
     *
     * @property Type
     *
     * @returns {String}
     */
    get type() {
        return 'TransactionSigner';
    }

    /**
     * Signs the transaction
     *
     * @param {String} txType transaction type `contract` or `plugin`
     *
     * @param {Object} transaction
     *
     * @param {String} privateKey
     *
     * @returns {Promise<{messageHash, signature, rawTransaction, transactionHash}>}
     */
    async sign(txType, transaction, privateKey) {
        if (!privateKey) {
            throw new Error('No privateKey given to the TransactionSigner.');
        }

        if (privateKey.startsWith('0x')) {
            privateKey = privateKey.substring(2);
        }

        let ftTx;

        if (txType === 'contract') {
            ftTx = ContractTx(transaction, this._chainID);
        } else if (txType === 'plugin') {
            ftTx = PluginTx(transaction, this._chainID);
        } else {
            throw new Error('No support tansaction type, only support contract or plugin');
        }

        ftTx.sign(Buffer.from(privateKey, 'hex'));

        const validationResult = ftTx.validate(true);

        if (validationResult !== '') {
            throw new Error(`TransactionSigner Error: ${validationResult}`);
        }

        const rlpEncoded = ftTx.serialize().toString('hex');
        const rawTransaction = '0x' + rlpEncoded;
        const transactionHash = Utils.keccak256(rawTransaction);

        return {
            messageHash: Buffer.from(ftTx.hash(false)).toString('hex'),
            signature: '0x' + Buffer.from(ftTx.signature).toString('hex'),
            rawTransaction,
            transactionHash
        };
    }
}
