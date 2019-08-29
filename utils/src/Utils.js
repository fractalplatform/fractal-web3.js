import * as abiUtil from 'ethereumjs-abi';
import * as ft from '../../ft/src/Fractal';
import {encode} from 'rlp';
import fetch from 'node-fetch';

let provider = 'http://127.0.0.1:8545';
let wsToNode = null;

export function setProvider(providerInfo) {
    provider = providerInfo;
    ft.getChainConfig().then((chainConfig) => {
        ft.setChainId(chainConfig.chainId);
    });
}

export function openWebSocket(wsAddr) {
    wsToNode = new WebSocket(wsAddr);
    websocket.addEventListener('open', function(event_) {
        console.log('ws open success');
    });
    websocket.onclose = function(event_) {
        console.log('ws close success');
    };
    websocket.addEventListener('message', function(event_) {
        console.log('get message:' + event_.data);
    });
    websocket.addEventListener('error', function(event_) {
        console.log('get error:' + event_.data);
    });
}

// data = []
export function getRlpData(data) {
    return encode(data);
}

export async function postToNode(dataToNode) {
    const resp = await fetch(provider, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: dataToNode.data
    });
    if (resp == null) {
        const error = 'fetch rpc failed: ' + dataToNode.data;
        throw error;
    }
    const response = await resp.json();
    if (response.error != null) {
        throw response.error.message;
    }
    return response.result;
}

export function hex2Bytes(string) {
    let pos = 0;
    let length_ = string.length;
    let hexA = new Uint8Array();

    if (length_ >= 2 && string[0] === '0' && (string[1] === 'x' || string[1] === 'X')) {
        pos = 2;
        length_ -= 2;
    }
    if (length_ === 0) {
        return hexA;
    }
    if (length_ % 2 !== 0) {
        if (pos === 0) {
            string = '0' + string;
        } else {
            string = string.substr(0, pos) + '0' + string.substr(pos);
            length_ += 1;
        }
    }

    length_ /= 2;
    hexA = new Uint8Array(length_);
    for (let i = 0; i < length_; i += 1) {
        const s = string.substr(pos, 2);
        const v = parseInt(s, 16);
        hexA[i] = v;
        pos += 2;
    }
    return hexA;
}
/* funcName: function name
 * parameterTypes: all parameter types, eg:  ['uint32', 'bool']
 * parameterValues: all parameter values, eg: [99, 1]
 *  */
export function getContractPayload(funcName, parameterTypes, parameterValues) {
    return (
        abiUtil.methodID(funcName, parameterTypes).toString('hex') +
        abiUtil.rawEncode(parameterTypes, parameterValues).toString('hex')
    );
}

export function isValidABI(abiInfoString) {
    try {
        const abiInfo = JSON.parse(abiInfoString);
        if (!Array.isArray(abiInfo)) {
            return false;
        }
        for (const abi of abiInfo) {
            if (abi.type == null) {
                return false;
            }
        }
        return true;
    } catch (error) {
        return false;
    }
}

export function parseContractTxPayload(abiInfoString, payload) {
    if (!isValidABI(abiInfoString)) {
        return null;
    }
    const returnValueInfo = {};
    const abiInfo = JSON.parse(abiInfoString);
    let startIndex = 0;
    if (payload.indexOf('0x') === 0) {
        startIndex = 2;
    }
    const encodedFunc = payload.substr(startIndex, 8);
    for (const interfaceInfo of abiInfo) {
        if (interfaceInfo.type === 'function') {
            const funcName = interfaceInfo.name;
            const parameterTypes = [];
            for (const input of interfaceInfo.inputs) {
                parameterTypes.push(input.type);
            }
            const methodId = abiUtil.methodID(funcName, parameterTypes).toString('hex');
            if (methodId === encodedFunc) {
                returnValueInfo.funcName = funcName;
                returnValueInfo.parameterInfos = [];
                const decodedValues = abiUtil.rawDecode(
                    parameterTypes,
                    Buffer.from(payload.substr(8 + startIndex), 'hex')
                );
                for (let i = 0; i < decodedValues.length; i++) {
                    const parameterInfo = {};
                    parameterInfo.name = interfaceInfo.inputs[i].name;
                    parameterInfo.type = parameterTypes[i];
                    parameterInfo.value = decodedValues[i];
                    returnValueInfo.parameterInfos.push(parameterInfo);
                }
                return returnValueInfo;
            }
        }
    }
    return null;
}

export function isEmptyObj(object) {
    return object == null || object == '';
}

export default {
    isEmptyObj,
    hex2Bytes,
    postToNode,
    getRlpData,
    setProvider,
    getContractPayload,
    isValidABI,
    parseContractTxPayload
};
