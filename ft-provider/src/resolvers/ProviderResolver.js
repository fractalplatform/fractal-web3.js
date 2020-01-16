export default class ProviderResolver {
    /**
     * @param {ProvidersModuleFactory} providersModuleFactory
     *
     * @constructor
     */
    constructor(providersModuleFactory) {
        this.providersModuleFactory = providersModuleFactory;
    }

    /**
     * Resolves the correct provider with his adapter
     *
     * @method resolve
     *
     * @param {HttpProvider} provider
     * @param {Net} net
     *
     * @returns {HttpProvider}
     */
    resolve(provider, net) {
        if (!provider) {
            return provider;
        }

        if (typeof provider === 'string') {
            // HTTP
            if (/^http(s)?:\/\//i.test(provider)) {
                return this.providersModuleFactory.createHttpProvider(provider);
            }
            // todo
            // // WS
            // if (/^ws(s)?:\/\//i.test(provider)) {
            //     return this.providersModuleFactory.createWebsocketProvider(provider);
            // }

            // // IPC
            // if (provider && isObject(net) && isFunction(net.connect)) {
            //     return this.providersModuleFactory.createIpcProvider(provider, net);
            // }
        }

        if (typeof provider === 'object') {
            return provider;
        }
    }
}
