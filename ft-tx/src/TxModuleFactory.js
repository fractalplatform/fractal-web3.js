import CTX from './transaction/ContractTx';
import PTX from './transaction/PluginTx';

export default class TxModuleFactory {
    /**
     * Returns an ContractTx object
     *
     * @method createContractTx
     *
     * @param {Object} txdata
     *
     * @param {Number} chainID
     *
     * @returns {ContractTx}
     */
    createContractTx(txdata, chainID) {
        return new CTX(txdata, chainID);
    }

    /**
     * Returns an PluginTx object
     *
     * @method createPluginTx
     *
     * @param {Object} txdata
     *
     * @param {Number} chainID
     *
     * @returns {PluginTx}
     */

    createPluginTx(txdata, chainID) {
        return new PTX(txdata, chainID);
    }
}

/**
 *  Creates the ContractTx object.
 *
 *  @param {Object} txdata
 *
 *  @param {Number} chainID
 *
 *  @returns {ContractTx}
 *
 */

export function ContractTx(txdata, chainID) {
    return new TxModuleFactory().createContractTx(txdata, chainID);
}

/**
 *  Creates the PluginTx object.
 *
 *  @param {Object} txdata
 *
 *  @param {Number} chainID
 *
 *  @returns {PluginTx}
 *
 */

export function PluginTx(txdata, chainID) {
    return new TxModuleFactory().createPluginTx(txdata, chainID);
}
