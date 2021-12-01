export const randomid = (size = 3) => {
    const data = new Uint32Array(size)
    const random = crypto.getRandomValues(data)
    return parseInt(random.join(''), 10).toString(36).replace(/0*$/, '')
}
