import * as utils from '../utils';


export async function addPeer(url) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'p2p_addPeer',
    params: [url],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function removePeer(url) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'p2p_removePeer',
    params: [url],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function addTrustedPeer(url) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'p2p_addTrustedPeer',
    params: [url],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function removeTrustedPeer(url) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'p2p_removeTrustedPeer',
    params: [url],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function selfNode() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'p2p_selfNode',
    params: [url],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function peerCount() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'p2p_peerCount',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function peers() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'p2p_peers',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}


export default { addPeer, removePeer, addTrustedPeer, removeTrustedPeer, selfNode, peerCount, peers }