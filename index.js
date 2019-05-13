import * as abiUtil from 'ethereumjs-abi';
import * as ft from '../ft'
let provider = 'http://127.0.0.1:8545';

export function setProvider(providerInfo) {
  provider = providerInfo;
  ft.getChainConfig().then(chainConfig => {
    ft.setChainId(chainConfig.chainId);
  });
}

// data = []
export function getRlpData(data) {
  return encode(data);
}

export async function postToNode(dataToNode) {
  const resp = await fetch(provider, {headers: { "Content-Type": "application/json" }, method: 'POST', body: dataToNode.data});
  const response = await resp.json();
  if (response.error != null) {
    throw response.error.message;
  }
  return response.result;
}

export function hex2Bytes(str) {
  let pos = 0;
  let len = str.length;
  let hexA = new Uint8Array();

  if (str[0] === '0' && (str[1] === 'x' || str[1] === 'X')) {
    pos = 2;
    len -= 2;
  }
  if (len === 0) {
    return hexA;
  }
  if (len % 2 !== 0) {
    if (pos === 0) {
      str = '0' + str;
    } else {
      str = str.substr(0, pos) + '0' + str.substr(pos);
      len += 1;
    }
  }

  len /= 2;
  hexA = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    const s = str.substr(pos, 2);
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
  return abiUtil.methodID(funcName, parameterTypes).toString('hex') + abiUtil.rawEncode(parameterTypes, parameterValues).toString('hex');
}

export default { hex2Bytes, postToNode, getRlpData, setProvider, getContractPayload };