import FtTransactionSigner from './signer/TransactionSigner';
import MethodProxy from '../../ft-api/src/proxy/MethodProxy';
import PayloadFactory from '../../ft-tx/src/transaction/PluginPayload';

export default class FT {
    /**
     * @param {HttpProvider|String} provider
     *
     * @param {Utils} utils
     *
     */

    constructor(provider, methodFactory = null, chainID, utils) {
        this.provider = provider;
        this.utils = utils;
        this.payload = new PayloadFactory();
        this._chainID = chainID;
        this._transactionSigner = new FtTransactionSigner(chainID);
        this._currentProvider = provider;
        if (methodFactory) {
            return new MethodProxy(this, methodFactory);
        }
    }

    /**
     * Getter for the transactionSigner property
     *
     * @property transactionSigner
     *
     * @returns {TransactionSigner}
     */
    get transactionSigner() {
        return this._transactionSigner;
    }

    /**
     * Returns the currentProvider
     *
     * @property currentProvider
     *
     * @returns {HttpProvider}
     */
    get currentProvider() {
        return this._currentProvider;
    }

    /**
     * Throws an error because currentProvider is read-only
     *
     * @property currentProvider
     */
    set currentProvider(value) {
        throw new Error('The property currentProvider is read-only!');
    }
}
