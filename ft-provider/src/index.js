import HProvider from './providers/HttpProvider';
import PResolver from './resolvers/ProviderResolver';

export default class ProvidersModuleFactory {
    /**
     * Returns an HttpProvider object
     *
     * @method createHttpProvider
     *
     * @param {String} url
     * @param {Object} options
     *
     * @returns {HttpProvider}
     */
    createHttpProvider(url, options = {}) {
        return new HProvider(url, options, this);
    }

    /**
     * Returns an ProviderResolver object
     *
     * @method createProviderResolver
     *
     * @returns {ProviderResolver}
     */
    createProviderResolver() {
        return new PResolver(this);
    }
}

/**
 * Creates the HttpProvider object.
 *
 * @param {String} url
 * @param {Object} options
 *
 * @returns {HttpProvider}
 *
 * @constructor
 */
export function HttpProvider(url, options = {}) {
    return new ProvidersModuleFactory().createHttpProvider(url, options);
}

/**
 * Creates the ProviderResolver object
 *
 * @method ProviderResolver
 *
 * @returns {ProviderResolver}
 *
 * @constructor
 */
export function ProviderResolver() {
    return new ProvidersModuleFactory().createProviderResolver();
}
