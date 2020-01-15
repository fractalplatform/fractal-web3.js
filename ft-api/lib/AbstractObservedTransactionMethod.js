import PromiEvent from './PromiEvent';
import AbstractMethod from './AbstractMethod';

export default class AbstractObservedTransactionMethod extends AbstractMethod {
    /**
     * @param {String} rpcMethod
     * @param {Number} parametersAmount
     * @param {AbstractWeb3Module} moduleInstance
     *
     * @constructor
     */
    constructor(rpcMethod, parametersAmount, moduleInstance) {
        super(rpcMethod, parametersAmount, moduleInstance);

        this.promiEvent = new PromiEvent();
    }

    /**
     * This type will be used in the AbstractMethodFactory.and BatchRequest class
     *
     * @returns {String}
     */
    static get Type() {
        return 'observed-transaction-method';
    }

    /**
     * This type will be used in the AbstractMethodFactory and BatchRequest class
     *
     * @returns {String}
     */
    get Type() {
        return 'observed-transaction-method';
    }

    /**
     * Sends the request and returns a PromiEvent Object
     *
     * @method execute
     *
     *
     * @callback callback callback(error, result)
     * @returns {PromiEvent}
     */
    execute() {
        this.beforeExecution(this.moduleInstance);

        this.moduleInstance.currentProvider
            .send(this.rpcMethod, this.parameters)
            .then((transactionHash) => {
                if (this.callback) {
                    this.callback(false, transactionHash);

                    return;
                }

                this.promiEvent.emit('transactionHash', transactionHash);
            })
            .catch((error) => {
                if (this.callback) {
                    this.callback(error, null);

                    return;
                }

                this.handleError(error, false, 0);
            });

        return this.promiEvent;
    }

    /**
     * This methods calls the correct error methods of the PromiEvent object.
     *
     * @method handleError
     *
     * @param {Error} error
     * @param {Object} receipt
     * @param {Number} confirmations
     */
    handleError(error, receipt, confirmations) {
        if (this.promiEvent.listenerCount('error') > 0) {
            this.promiEvent.emit('error', error, receipt, confirmations);
            this.promiEvent.removeAllListeners();

            return;
        }

        this.promiEvent.reject(error);
    }
}
