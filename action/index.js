import * as ethUtil from 'ethereumjs-util';
import * as abiUtil from 'ethereumjs-abi';
import * as utils from '../utils';
import * as ft from '../ft';
import * as actionTypes from './actionTypes';

const accountReg = new RegExp('^[a-z0-9]{7,16}(\\.[a-z0-9]{1,8}){0,1}$');

function validateTx(txInfo) {

}

/**
 * contractAccountName:
 * functionName:
 * parameterTypes: eg:  ['uint32', 'bool']
 * parameterValues: eg: [99, 1]
 *  */
export async function callContract(contractAccountName, functionName, parameterTypes, parameterValues, bValidate) {

}

export async function createContract(contractInfo, bValidate) {
  
}

export async function createAccount(accountInfo, bValidate) {
  if (bValidate) {
    if (!accountReg.test(this.state.newAccountName)) {
      console.log(this.state.newAccountName);
      throw '账号格式错误';
    }
    const exist = await fractal.account.isAccountExist(this.state.newAccountName);
    if (exist) {
      throw '账号已存在，不可重复创建';
    }
    publicKey = utils.getPublicKeyWithPrefix(publicKey);
    if (!ethUtil.isValidPublic(Buffer.from(utils.hex2Bytes(publicKey)), true)) {
      throw '无效公钥';
    }
  }
}

export async function updateAccount(accountInfo, bValidate) {
  
}

export async function deleteAccount(accountInfo, bValidate) {
  
}

export async function updateAccountAuthor(accountInfo, bValidate) {
  
}

export async function issueAsset(assetInfo, bValidate) {
  
}

export async function increaseAsset(assetInfo, bValidate) {
  
}

export async function destoryAsset(assetInfo, bValidate) {
  
}

export async function setAssetOwner(assetInfo, bValidate) {
  
}

export async function updateAsset(assetInfo, bValidate) {
  
}

export async function transfer(transferInfo, bValidate) {
  
}


export async function registerCandidate(candidateInfo, bValidate) {
  
}

export async function updateCandidate(candidateInfo, bValidate) {
  
}

export async function unRegisterCandidate(candidateInfo, bValidate) {
  
}

export async function refundDeposit(candidateInfo, bValidate) {
  
}

export async function vote(voterInfo, bValidate) {
  
}

export async function withdrawTxFee(feeInfo, bValidate) {
  
}

