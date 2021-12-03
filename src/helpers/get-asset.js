/**
 *
 * @param {string} path El path del asset
 * @returns El archivo de asset si lo encuentra o undefined
 */
export const asset = path => {
    try {
        return require(`../assets/${path}`).default
    } catch (error) {
        return
    }
}
