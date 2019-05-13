import * as utils from '../utils';



export async function startMiner() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'miner_start',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function stopMiner() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'miner_stop',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function force() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'miner_force',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function isMining() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'miner_mining',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

// privateKeys: [priKey1, priKey2, ...]
export async function setCoinbase(accountName, privateKeys) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'miner_setCoinbase',
    params: [accountName, privateKeys],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function setExtra(extraInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'miner_setExtra',
    params: [extraInfo],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export default { startMiner, stopMiner, force, isMining, setCoinbase, setExtra }