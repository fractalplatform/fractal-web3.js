import HProvider from './providers/HttpProvider';
import PResolver from './resolvers/ProviderResolver';
import {XMLHttpRequest as XHR} from 'xhr2-cookies';

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

    /**
     * Returns a XMLHttpRequest object
     *
     * @method createXMLHttpRequest
     *
     * @param {String} host
     * @param {Number} timeout
     * @param {Array} headers
     * @param {Object} agent
     * @param {Boolean} withCredentials
     *
     * @returns {XMLHttpRequest}
     */
    createXMLHttpRequest(host, timeout, headers, agent, withCredentials) {
        let request;

        // runtime is of type node
        if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
            request = new XHR();
            request.nodejsSet(agent);
        } else {
            request = new XMLHttpRequest();
        }

        request.open('POST', host, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.timeout = timeout;
        request.withCredentials = withCredentials;

        if (headers) {
            headers.forEach((header) => {
                request.setRequestHeader(header.name, header.value);
            });
        }

        return request;
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
