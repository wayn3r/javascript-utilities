/**
 *
 * @param {String} query
 * @returns {Object}
 */
export const queryParams = query => {
    const params = {}
    new URLSearchParams(query).forEach((value, key) => (params[key] = value))
    return params
}
