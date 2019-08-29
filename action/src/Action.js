// import * as ethUtil from 'ethereumjs-util';
// import * as abiUtil from 'ethereumjs-abi';
// import * as utils from '../utils';
// import * as ft from '../ft';
// import * as actionTypes from './src/ActionTypes';

// const accountReg = new RegExp('^[a-z0-9]{7,16}(\\.[a-z0-9]{1,8}){0,1}$');

/**
 txInfo = {gasAssetId, gasPrice, actions:[{actionType, accountName, nonce, gasLimit, toAccountName, assetId, amount, payloadRawInfo, remark}]}
 payloadRawInfo is the original, NOT the encoded info, for example, when create account, payloadRawInfo should be {accountName:'...', founder:'...', publicKey:'...', description: '...'}
*/
export async function validateTx(txInfo) {
    // todo
}
