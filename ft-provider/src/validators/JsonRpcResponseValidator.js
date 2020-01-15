import isObject from 'lodash/isObject';

export default class JsonRpcResponseValidator {
    /**
     * Executes JSON-RPC response validation
     *
     * @method isValid
     *
     * @param {Object} response
     * @param {Object|Array} payload
     *
     * @returns {Boolean}
     */
    static validate(response, payload = false) {
        if (isObject(response)) {
            if (response.error) {
                if (response.error instanceof Error) {
                    return new Error(`Node error: ${response.error.message}`);
                }

                return new Error(`Node error: ${JSON.stringify(response.error)}`);
            }

            if (payload && response.id !== payload.id) {
                return new Error(
                    `Validation error: Invalid JSON-RPC response ID (request: ${payload.id} / response: ${response.id})`
                );
            }

            if (response.result === undefined) {
                return new Error('Validation error: Undefined JSON-RPC result');
            }

            return true;
        }

        return new Error('Validation error: Response should be of type Object');
    }
}
