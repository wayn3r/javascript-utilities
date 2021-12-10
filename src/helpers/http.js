/**
 *
 * @param {Response} response
 * @returns {Promise} El cuerpo de la respuesta formateado correctamente
 */
const processResponse = async response => {
    const contentType = response.headers.get('content-type')
    switch (contentType) {
        case 'application/json':
            return await response.json()
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'application/pdf':
        case 'image/jpeg':
            const meta = {}
            const disposition = response.headers.get('content-disposition')
            if (disposition) {
                meta.contentDisposition = {}
                disposition.split(';').forEach(val => {
                    const [key, value = ''] = val.trim().split('=')
                    meta.contentDisposition[key] =
                        value.replace(/^("|')|("|')$/gi, '') || true
                })
            }

            return {
                response: await response.blob(),
                status: response.status,
                meta,
            }

        default:
            return await response.text()
    }
}

export const get = async (url, options) => {
    if (!url) throw new Error('Debe ingresar una url')
    let params = ''
    if (options?.data)
        for (const key in options.data) {
            params += `&${key}=${encodeURIComponent(options.data[key])}`
        }

    url += params.replace(/^&/, '?')
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            signal: options?.signal,
        })

        return await processResponse(response)
    } catch (err) {
        console.warn(err)
        return { error: err }
    }
}

export const post = async (url, options) => {
    if (!url) throw new Error('Debe ingresar una url')

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(options?.data),
            credentials: 'include',
            signal: options?.signal,
        })
        return await processResponse(response)
    } catch (err) {
        console.warn(err)
        return { status: 'aborted', error: err }
    }
}

const _default = {
    get,
    post,
}
export default _default
