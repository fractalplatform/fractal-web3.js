import * as abi from 'ethereumjs-abi';

export default class PluginPayloadFactory {
    constructor() {}

    createAccount(account, pubkey, desc) {
        return this.getContractPayload('CreateAccount', ['string', 'string', 'string'], [account, pubkey, desc]);
    }

    changePubKey(pubkey) {
        return this.getContractPayload('ChangePubKey', ['string'], [pubkey]);
    }

    transfer(to, assetID, value) {
        return this.getContractPayload('Transfer', ['string', 'uint64', 'uint256'], [to, assetID, value]);
    }

    registerMiner(account) {
        return this.getContractPayload('RegisterMiner', ['string'], [account]);
    }

    unregisterMiner() {
        return this.getContractPayload('UnregisterMiner', [], []);
    }

    getContractPayload(funcName, parameterTypes, parameterValues) {
        return (
            '0x' +
            abi.methodID(funcName, parameterTypes).toString('hex') +
            abi.rawEncode(parameterTypes, parameterValues).toString('hex')
        );
    }
}
