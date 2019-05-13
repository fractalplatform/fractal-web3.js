import * as utils from '../utils';

export async function status() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'txpool_status',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function content() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'txpool_content',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function setGasPrice(gasPrice) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'txpool_setGasPrice',
    params: [gasPrice],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export default { status, content, setGasPrice }