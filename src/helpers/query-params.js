/**
 *
 * @param {String} query
 * @returns {Object}
 */
export const getQueryParams = query => {
    const params = {}
    new URLSearchParams(query).forEach((value, key) => (params[key] = value))
    return params
}
/**
 *
 * @param {Object} data
 * @returns {String}
 */
 export const setQueryParams = data => {
    let params = ''
    if (data)
        for (const key in data) {
            params += `&${key}=${encodeURIComponent(data[key])}`
        }
    return params.replace(/^&/, '?')
}
