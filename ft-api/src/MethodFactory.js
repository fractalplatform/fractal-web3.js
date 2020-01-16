import SendRawTransactionMethod from './txpool/SendRawTransactionMethod';

export default class MethodFactory {
    /**
     *
     * @constructor
     */
    constructor() {
        this._methods = {
            sendRawTransaction: SendRawTransactionMethod
        };
    }

    /**
     * Gets the methods object
     *
     * @property methods
     *
     * @returns {null|Object}
     */
    get methods() {
        if (this._methods) {
            return this._methods;
        }

        throw new Error('No methods defined for MethodFactory!');
    }

    /**
     * Sets the methods object
     *
     * @property methods
     *
     * @param {Object} value
     */
    set methods(value) {
        this._methods = value;
    }

    /**
     * Checks if the method exists
     *
     * @method hasMethodModel
     *
     * @param {String} name
     *
     * @returns {Boolean}
     */
    hasMethod(name) {
        return typeof this._methods[name] !== 'undefined';
    }

    /**
     * Returns an MethodModel
     *
     * @param {String} name
     * @param {AbstractWeb3Module} moduleInstance
     *
     * @returns {AbstractMethod}
     */
    createMethod(name, moduleInstance) {
        const method = this._methods[name];

        // eslint-disable-next-line new-cap
        return new method(moduleInstance);
    }
}
