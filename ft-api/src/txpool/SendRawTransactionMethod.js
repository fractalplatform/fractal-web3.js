import AbstractObservedTransactionMethod from '../../lib/AbstractObservedTransactionMethod';

export default class SendRawTransactionMethod extends AbstractObservedTransactionMethod {
    /**
     * @param {AbstractWeb3Module} moduleInstance
     *
     * @constructor
     */
    constructor(moduleInstance) {
        super('ft_sendRawTransaction', 1, moduleInstance);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Object}
     */
    afterExecution(response) {
        return response;
        // return this.formatters.outputTransactionFormatter(response);
    }
}
