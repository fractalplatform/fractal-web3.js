import * as utils from '../utils';

export async function getObjectFeeByName(objectName, objectType) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'fee_getObjectFeeByName',
    params: [objectName, objectType],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getObjectFeeResult(startObjectFeeID, count) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'fee_getObjectFeeResult',
    params: [startObjectFeeID, count],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getObjectFeeResultByTime(time, startObjectFeeID, count) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'fee_getObjectFeeResultByTime',
    params: [time, startObjectFeeID, count],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export default { getObjectFeeByName, getObjectFeeResult, getObjectFeeResultByTime }