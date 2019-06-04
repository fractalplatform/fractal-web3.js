import * as utils from '../utils';

export async function getCandidate(epoch, accountName) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_candidate',
    params: [epoch, accountName],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getCandidateNumber(epoch) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_candidatesSize',
    params: [epoch],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getCandidates(epoch, bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_candidates',
    params: [epoch, bDetailInfo],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getActivedCandidateNumber(epoch) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_getActivedCandidateSize',
    params: [epoch],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getActivedCandidate(epoch, index) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_getActivedCandidate',
    params: [epoch, index],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getDposInfo() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_info',
    params: [],
    id: 1 });
  return utils.postToNode({
      data: dataToSrv,
    });
}

export async function getDposIrreversibleInfo() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_irreversible',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getValidCandidates(epoch) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_validCandidates',
    params: [epoch],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getAvailableStake(epoch, accountName) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_availableStake',
    params: [epoch, accountName],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

// get all voters info who vote to the candidate
export async function getVotersByCandidate(epoch, candidateName, bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_votersByCandidate',
    params: [epoch, candidateName, bDetailInfo],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}
// get voter's all vote info
export async function getVotersByVoter(epoch, voterName, bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_votersByVoter',
    params: [epoch, voterName, bDetailInfo],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getNextValidCandidates() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_nextValidCandidates',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}


export async function getSnapShotTime(epoch) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_snapShotTime',
    params: [epoch],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getEpochByHeight(blockHeight) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_epoch',
    params: [blockHeight],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getPreEpoch(epoch) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_prevEpoch',
    params: [epoch],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getNextEpoch(epoch) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_nextEpoch',
    params: [epoch],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export default { getCandidate, getDposIrreversibleInfo, getCandidates, getCandidateNumber,
  getVotersByCandidate, getVotersByVoter, getAvailableStake, getValidCandidates, 
  getDposInfo, getNextValidCandidates, getSnapShotTime,  getEpochByHeight, getPreEpoch, getNextEpoch, 
  getActivedCandidate, getActivedCandidateNumber,
};