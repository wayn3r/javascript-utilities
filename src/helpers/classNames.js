/**
 *
 * @param  {...String} classNames
 * @return {String}
 */
export const classNames = (...classNames) => {
    return classNames
        .filter(cname => typeof cname === 'string' && Boolean(cname.trim()))
        .join(' ')
}
