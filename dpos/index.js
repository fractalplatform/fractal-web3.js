import * as utils from '../utils';

export async function getCandidate(accountName) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_candidate',
    params: [accountName],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getCandidateByHeight(blockHeight, accountName) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_candidateByHeight',
    params: [blockHeight, accountName],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getCandidates(bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_candidates',
    params: [bDetailInfo],
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

export async function getValidCandidates() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_validCandidates',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getValidCandidatesByHeight(blockHeight) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_validCandidatesByHeight',
    params: [blockHeight],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getAvailableStake(accountName) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_availableStake',
    params: [accountName],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getAvailableStakeByHeight(blockHeight, accountName) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_availableStake',
    params: [blockHeight, accountName],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

// get all voters info who vote to the candidate
export async function getVotersByCandidate(candidateName, bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_votersByCandidate',
    params: [candidateName, bDetailInfo],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getVotersByCandidateByHeight(blockHeight, candidateName, bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_votersByCandidateByHeight',
    params: [blockHeight, candidateName, bDetailInfo],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

// get voter's all vote info
export async function getVotersByVoter(voterName, bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_votersByVoter',
    params: [voterName, bDetailInfo],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getVotersByVoterByHeight(blockHeight, voterName, bDetailInfo) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_votersByVoterByHeight',
    params: [blockHeight, voterName, bDetailInfo],
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

export async function getNextValidCandidatesByHeight(blockHeight) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_nextValidCandidatesByHeight',
    params: [blockHeight],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getSnapShotTime() {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_snapShotTime',
    params: [],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export async function getSnapShotTimeByHeight(blockHeight) {
  const dataToSrv = JSON.stringify({ jsonrpc: '2.0',
    method: 'dpos_snapShotTimeByHeight',
    params: [blockHeight],
    id: 1 });
  return utils.postToNode({
    data: dataToSrv,
  });
}

export default { getCandidate, getCandidateByHeight, getDposIrreversibleInfo, getCandidates, 
  getVotersByCandidate, getVotersByCandidateByHeight, getVotersByVoter, getVotersByVoterByHeight,
  getAvailableStake, getAvailableStakeByHeight, getValidCandidates, getValidCandidatesByHeight,
  getDposInfo, getNextValidCandidates, getNextValidCandidatesByHeight, getSnapShotTime, getSnapShotTimeByHeight, 
   };