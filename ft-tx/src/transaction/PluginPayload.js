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

    // gaia item

    issueWorld(owner, name, des) {
        return this.getContractPayload('IssueWorld', ['string', 'string', 'string'], [owner, name, des]);
    }

    updateWorldOwner(newOwner, worldID) {
        return this.getContractPayload('UpdateWorldOwner', ['string', 'uint64'], [newOwner, worldID]);
    }

    /**
     *
     * @param {object} data
     *
     * @example
     *
     * ```js
     * const data = {
     *  worldID = 1,
     *  name = 'testaccount',
     *  merge = true,
     *  upperLimit = 100,
     *  description = 'test',
     *  attributePermissions =[0,1]
     *  attributeNames = ["baoji", "gongjishanghai"],
     *  attributeDescriptions =["暴击属性", "攻击伤害"],
     * }
     *
     * ```
     *
     */

    issueItemType(data) {
        return this.getContractPayload(
            'IssueItemType',
            ['uint64', 'string', 'bool', 'uint64', 'string', 'uint64[]', 'string[]', 'string[]'],
            [
                data.worldID,
                data.name,
                data.merge,
                data.upperLimit,
                data.description,
                data.attributePermissions,
                data.attributeNames,
                data.attributeDescriptions
            ]
        );
    }

    /**
     *
     * @param {object} data
     *
     * @example
     *
     * ```js
     * const data = {
     *  worldID = 1,
     *  itemTypeID = 1,
     *  owner = 'testaccount'
     *  description = 'test',
     *  attributePermissions =[0,1]
     *  attributeNames = ["baoji", "gongjishanghai"],
     *  attributeDescriptions =["暴击属性", "攻击伤害"],
     * }
     *
     * ```
     */

    increaseItem(data) {
        return this.getContractPayload(
            'IncreaseItem',
            ['uint64', 'uint64', 'string', 'string', 'uint64[]', 'string[]', 'string[]'],
            [
                data.worldID,
                data.itemTypeID,
                data.owner,
                data.description,
                data.attributeDescriptions,
                data.attributeNames,
                data.attributeDescriptions
            ]
        );
    }

    destroyItem(worldID, itemTypeID, itemID) {
        return this.getContractPayload('DestroyItem', ['uint64', 'uint64', 'uint64'], [worldID, itemTypeID, itemID]);
    }

    increaseItems(worldID, itemTypeID, owner, count) {
        return this.getContractPayload(
            'IncreaseItems',
            ['uint64', 'uint64', 'string', 'uint64'],
            [worldID, itemTypeID, owner, count]
        );
    }

    destroyItems(worldID, itemTypeID, count) {
        return this.getContractPayload('DestroyItems', ['uint64', 'uint64', 'uint64'], [worldID, itemTypeID, count]);
    }

    transferItem(to, worldIDs, itemTypeIDs, itemIDs, amounts) {
        return this.getContractPayload(
            'TransferItem',
            ['string', 'uint64[]', 'uint64[]', 'uint64[]', 'uint64[]'],
            to,
            worldIDs,
            itemTypeIDs,
            itemIDs,
            amounts
        );
    }

    /**
     * @param {object} data
     *
     * @example
     *
     * ```js
     * const data = {
     *  worldID = 1,
     *  itemTypeID = 1,
     *  attributePermissions =[0,1]
     *  attributeNames = ["baoji", "gongjishanghai"],
     *  attributeDescriptions =["暴击属性", "攻击伤害"],
     * }
     * ```
     */
    addItemTypeAttributes(data) {
        return this.getContractPayload(
            'AddItemTypeAttributes',
            ['uint64', 'uint64', 'uint64[]', 'string[]', 'string[]'],
            [data.worldID, data.itemTypeID, data.attributePermissions, data.attributeNames, data.attributeDescriptions]
        );
    }

    delItemTypeAttributes(worldID, itemTypeID, attributeNames) {
        return this.getContractPayload(
            'DelItemTypeAttributes',
            ['uint64', 'uint64', 'string[]'],
            [worldID, itemTypeID, attributeNames]
        );
    }

    /**
     * @param {object} data
     *
     * @example
     *
     * ```js
     * const data = {
     *  worldID = 1,
     *  itemTypeID = 1,
     *  attributePermissions =[0,1]
     *  attributeNames = ["baoji", "gongjishanghai"],
     *  attributeDescriptions =["暴击属性", "攻击伤害"],
     * }
     * ```
     */
    modifyItemTypeAttributes(data) {
        return this.getContractPayload(
            'ModifyItemTypeAttributes',
            ['uint64', 'uint64', 'uint64[]', 'string[]', 'string[]'],
            [data.worldID, data.itemTypeID, data.attributePermissions, data.attributeNames, data.attributeDescriptions]
        );
    }

    /**
     * @param {object} data
     *
     * @example
     *
     * ```js
     * const data = {
     *  worldID = 1,
     *  itemID = 1,
     *  itemTypeID = 1,
     *  attributePermissions =[0,1]
     *  attributeNames = ["baoji", "gongjishanghai"],
     *  attributeDescriptions =["暴击属性", "攻击伤害"],
     * }
     * ```
     */
    addItemAttributes(data) {
        return this.getContractPayload(
            'AddItemAttributes',
            ['uint64', 'uint64', 'uint64', 'uint64[]', 'string[]', 'string[]'],
            [
                data.worldID,
                data.itemID,
                data.itemTypeID,
                data.attributePermissions,
                data.attributeNames,
                data.attributeDescriptions
            ]
        );
    }

    delItemAttributes(worldID, itemTypeID, ItemID, attributeNames) {
        return this.getContractPayload(
            'DelItemAttributes',
            ['uint64', 'uint64', 'uint64', 'string[]'],
            [worldID, itemTypeID, ItemID, attributeNames]
        );
    }

    /**
     * @param {object} data
     *
     * @example
     *
     * ```js
     * const data = {
     *  worldID = 1,
     *  itemID = 1,
     *  itemTypeID = 1,
     *  attributePermissions =[0,1]
     *  attributeNames = ["baoji", "gongjishanghai"],
     *  attributeDescriptions =["暴击属性", "攻击伤害"],
     * }
     * ```
     */
    modifyItemAttributes(data) {
        return this.getContractPayload(
            'ModifyItemAttributes',
            ['uint64', 'uint64', 'uint64', 'uint64[]', 'string[]', 'string[]'],
            [
                data.worldID,
                data.itemID,
                data.itemTypeID,
                data.attributePermissions,
                data.attributeNames,
                data.attributeDescriptions
            ]
        );
    }

    getContractPayload(funcName, parameterTypes, parameterValues) {
        return (
            '0x' +
            abi.methodID(funcName, parameterTypes).toString('hex') +
            abi.rawEncode(parameterTypes, parameterValues).toString('hex')
        );
    }
}
