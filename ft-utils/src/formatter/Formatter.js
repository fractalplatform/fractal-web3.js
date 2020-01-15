/**
 * @method isPredefinedBlockNumber
 *
 * @param {String} blockNumber
 *
 * @returns {Boolean}
 */
export const isPredefinedBlockNumber = (blockNumber) => {
    return blockNumber === 'latest' || blockNumber === 'earliest';
};
