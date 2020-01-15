import EventEmitter from 'eventemitter3';

// TODO: add handleSuccess() and handleError() method instead of having them in the send method class
export default class PromiEvent {
    /**
     * @constructor
     */
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });

        this.eventEmitter = new EventEmitter();

        return new Proxy(this, {
            get: this.proxyHandler
        });
    }

    /**
     * Proxy handler to call the promise or eventEmitter methods
     *
     * @method proxyHandler
     *
     * @param {PromiEvent} target
     * @param {String|Symbol} name
     *
     * @returns {Function}
     */
    proxyHandler(target, name) {
        if (name === 'resolve' || name === 'reject') {
            return target[name];
        }

        if (name === 'then') {
            return target.promise.then.bind(target.promise);
        }

        if (name === 'catch') {
            return target.promise.catch.bind(target.promise);
        }

        if (target.eventEmitter[name]) {
            return target.eventEmitter[name];
        }
    }
}
