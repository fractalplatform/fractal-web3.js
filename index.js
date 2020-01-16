import FtModule from './ft/src/Ft';
import FtTransactionSigner from './ft/src/signer/TransactionSigner';
import * as Utils from './ft-utils/src/utils/Utils';
import {ProviderResolver} from './ft-provider/src/ProvidersModuleFactory';
import MethodFactory from './ft-api/src/MethodFactory';

/**
 * Creates the TransactionSigner class
 * @method TransactionSigner
 *
 * @param {Number} chainID chain id
 *
 * @returns {TransactionSigner}
 *
 */
export function TransactionSigner(chainID) {
    return new FtTransactionSigner(chainID);
}

/**
 * Creates the Ft object
 *
 * @method Ft
 *
 * @param {HttpProvider|String} provider
 *
 * @param {Number} chainID
 *
 * @returns {Ft}
 *
 */

export function Ft(chainID, provider, net = null) {
    const resolvedProvider = new ProviderResolver().resolve(provider, net);
    return new FtModule(resolvedProvider, new MethodFactory(), chainID, Utils);
}
