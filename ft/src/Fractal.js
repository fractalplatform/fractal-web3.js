import * as EthUtil from 'ethereumjs-util';
import * as EthCrypto from 'eth-crypto';
import {encode} from 'rlp';
import * as utils from '../../utils/src/Utils';
import * as account from '../../account/src/Account';

let chainId = 1;

export function getChainId() {
    return chainId;
}

export function setChainId(newChainId) {
    chainId = newChainId;
}

export async function getCurrentBlock(bFullTx) {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_getCurrentBlock', params: [bFullTx], id: 1});
    return utils.postToNode({data: dataToSrv});
}

export async function getBlockByHash(blockHash, bFullTx) {
    const dataToSrv = JSON.stringify({
        jsonrpc: '2.0',
        method: 'ft_getBlockByHash',
        params: [blockHash, bFullTx],
        id: 1
    });
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getBlockByNum(blockNumber, bFullTx) {
    const dataToSrv = JSON.stringify({
        jsonrpc: '2.0',
        method: 'ft_getBlockByNumber',
        params: [blockNumber, bFullTx],
        id: 1
    });
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getTransactionByHash(blockHash) {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_getTransactionByHash', params: [blockHash], id: 1});
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getTransactionReceipt(txHash) {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_getTransactionReceipt', params: [txHash], id: 1});
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getSuggestionGasPrice() {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_gasPrice', params: [], id: 1});
    return utils.postToNode({
        data: dataToSrv
    });
}
export async function getTxsByAccount(accountName, blockNumber, lookbackNumber) {
    const dataToSrv = JSON.stringify({
        jsonrpc: '2.0',
        method: 'ft_getTxsByAccount',
        params: [accountName, blockNumber, lookbackNumber],
        id: 1
    });
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getTxsByBloom(bloom, blockNumber, lookbackNumber) {
    const dataToSrv = JSON.stringify({
        jsonrpc: '2.0',
        method: 'ft_getTxsByBloom',
        params: [bloom, blockNumber, lookbackNumber],
        id: 1
    });
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getInternalTxsByAccount(accountName, blockNumber, lookbackNumber) {
    const dataToSrv = JSON.stringify({
        jsonrpc: '2.0',
        method: 'ft_getInternalTxByAccount',
        params: [accountName, blockNumber, lookbackNumber],
        id: 1
    });
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getInternalTxsByBloom(bloom, blockNumber, lookbackNumber) {
    const dataToSrv = JSON.stringify({
        jsonrpc: '2.0',
        method: 'ft_getInternalTxByBloom',
        params: [bloom, blockNumber, lookbackNumber],
        id: 1
    });
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getInternalTxByHash(txHash) {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_getInternalTxByHash', params: [txHash], id: 1});
    return utils.postToNode({
        data: dataToSrv
    });
}

export async function getChainConfig() {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_getChainConfig', params: [], id: 1});
    return utils.postToNode({
        data: dataToSrv
    });
}

// {"actionType":0,"from":"testtest31","to":"testtest32",
// "assetId":1,"gas":200000,"gasPrice":1,"value":0,"data":""}
export async function call(callInfo, blockNumber) {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_call', params: [callInfo, blockNumber], id: 1});
    return utils.postToNode({
        data: dataToSrv
    });
}

// {"actionType":0,"from":"testtest31","to":"testtest32",
// "assetId":1,"gas":200000,"gasPrice":1,"value":0,"data":""}
export async function estimateGas(txInfo, blockNumber) {
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_estimateGas', params: [txInfo, blockNumber], id: 1});
    return utils.postToNode({
        data: dataToSrv
    });
}

function getRSV(signature) {
    const r = signature.slice(0, 66);
    const s = '0x' + signature.slice(66, 130);
    let v = '0x' + signature.slice(130, 132);
    if (chainId !== 0) {
        v = v === '0x1c' ? 1 : 0;
        v += chainId * 2 + 35;
        v = '0x' + v.toString(16);
    }
    return {r, s, v};
}

export async function packTx(txInfo) {
    if (utils.isEmptyObj(txInfo.chainId)) {
        txInfo.chainId = chainId;
    }
    if (utils.isEmptyObj(txInfo.gasAssetId)) {
        const chainConfig = await getChainConfig();
        const assetInfo = await account.getAssetInfoByName(chainConfig.systemToken);
        txInfo.gasAssetId = assetInfo.assetId == null ? 0 : assetInfo.assetId;
    }
    for (let i = 0; i < txInfo.actions.length; i++) {
        let action = txInfo.actions[i];
        if (utils.isEmptyObj(action.nonce)) {
            action.nonce = await account.getNonce(action.accountName);
        }
        if (utils.isEmptyObj(action.payload)) {
            action.payload = '0x';
        }
        if (action.remark == null) {
            action.remark = '';
        }
    }
    return txInfo;
}
/**
 txInfo = {chainId, gasAssetId, gasPrice, actions:[{actionType, accountName, nonce, gasLimit, toAccountName, assetId, amount, payload, remark}]}
*/
export async function signTx(txInfo, privateKey) {
    await packTx(txInfo);

    const actionHashs = [];
    for (const action of txInfo.actions) {
        const {accountName, actionType, nonce, gasLimit, toAccountName, assetId, amount, remark} = action;
        let {payload} = action;
        payload = utils.hex2Bytes(payload);
        const actionHash = EthUtil.rlphash([
            accountName,
            actionType,
            nonce,
            toAccountName,
            gasLimit,
            amount,
            payload,
            assetId,
            remark,
            txInfo.chainId,
            0,
            0
        ]);
        actionHashs.push(actionHash);
    }

    const merkleRoot = EthUtil.keccak(actionHashs[0]);
    const txHash = EthUtil.rlphash([merkleRoot, txInfo.gasAssetId, txInfo.gasPrice]).toString('hex');
    const signature = EthCrypto.sign(privateKey, txHash);
    return signature;
}

export async function recoverSignedTx(txInfo, signature) {
    const actionHashs = [];
    for (const action of txInfo.actions) {
        const {accountName, actionType, nonce, gasLimit, toAccountName, assetId, amount, remark} = action;
        let {payload} = action;
        payload = utils.hex2Bytes(payload);
        const actionHash = EthUtil.rlphash([
            accountName,
            actionType,
            nonce,
            toAccountName,
            gasLimit,
            amount,
            payload,
            assetId,
            remark,
            txInfo.chainId,
            0,
            0
        ]);

        actionHashs.push(actionHash);
    }
    const merkleRoot = EthUtil.keccak(actionHashs[0]);

    const txHash = EthUtil.rlphash([merkleRoot, txInfo.gasAssetId, txInfo.gasPrice]).toString('hex');

    const address = EthCrypto.recover(signature, txHash);
    return address;
}

/* 
txInfo: object of transaction info: {chainId, gasAssetId, gasPrice, actions:[{actionType, accountName, nonce, gasLimit, toAccountName, assetId, amount, payload, remark}]},
        if you don't pass chainId, gasAssetId, nonce, payload and remark, it will use default value.
*/
export async function sendSingleSigTransaction(txInfo, signInfo) {
    const multiSigInfos = [{signInfo, indexes: [0]}];
    return sendSeniorSigTransaction(txInfo, multiSigInfos, 0);
}

/* sendSeniorSigTransaction:  send senior signed tx to node, you can use multiple or/and inherited signature
txInfo: object of transaction info: {chainId, gasAssetId, gasPrice, actions:[{actionType, accountName, nonce, gasLimit, toAccountName, assetId, amount, payload, remark}]},
        if you don't pass chainId, gasAssetId, nonce, payload and remark, it will use default value.
multiSigInfos: [{signInfo, indexes}], signInfo is generated by signTx function, and indexes are indexes of signatures, eg: [0] [0,1] [1] [1,2,3]
*/
export async function sendSeniorSigTransaction(txInfo, multiSignInfos, parentIndex) {
    await packTx(txInfo);

    txInfo.actions[0].sign = {parentIndex, signData: []};
    // txInfo.actions[0].signData = [];
    for (const signInfo of multiSignInfos) {
        const rsv = getRSV(signInfo.signInfo);
        txInfo.actions[0].sign.signData.push([rsv.v, rsv.r, rsv.s, signInfo.indexes]);
    }
    // Object.assign(tx.actions[0], rsv);
    const action = txInfo.actions[0];
    let rlpData = encode([
        txInfo.gasAssetId,
        txInfo.gasPrice,
        [
            [
                action.actionType,
                action.nonce,
                action.assetId,
                action.accountName,
                action.toAccountName,
                action.gasLimit,
                action.amount,
                action.payload,
                action.remark,
                [action.sign.parentIndex, [...action.sign.signData]]
            ]
        ]
    ]);
    rlpData = '0x' + rlpData.toString('hex');
    const dataToSrv = JSON.stringify({jsonrpc: '2.0', method: 'ft_sendRawTransaction', params: [rlpData], id: 1});

    return utils.postToNode({
        data: dataToSrv
    });
}

export default {
    getChainId,
    setChainId,
    getCurrentBlock,
    getBlockByHash,
    getBlockByNum,
    getTransactionByHash,
    getTransactionReceipt,
    getSuggestionGasPrice,
    getTxsByAccount,
    getTxsByBloom,
    getChainConfig,
    getInternalTxsByAccount,
    getInternalTxsByBloom,
    getInternalTxByHash,
    packTx,
    signTx,
    recoverSignedTx,
    sendSingleSigTransaction,
    sendSeniorSigTransaction,
    call,
    estimateGas
};
