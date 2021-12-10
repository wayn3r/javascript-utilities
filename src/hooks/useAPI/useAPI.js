import { useCallback, useEffect, useState } from 'react'
import fetch from '../../helpers/http'

const useAPI = () => {
    const [controller, setController] = useState(new AbortController())
    const [loading, setLoading] = useState(false)

    const abort = useCallback(() => {
        setController(controller => {
            controller.abort()
            return new AbortController()
        })
    }, [])

    useEffect(() => {
        return () => {
            abort()
        }
    }, [abort])
    const get = useCallback(
        async (endpoint, options = {}) => {
            options.signal = controller.signal
            setLoading(true)
            const response = await fetch.get(endpoint, options)
            setLoading(false)
            return response
        },
        [controller]
    )

    const post = useCallback(
        async (endpoint, options = {}) => {
            options.signal = controller.signal
            setLoading(true)
            const response = await fetch.post(endpoint, options)
            setLoading(false)

            return response
        },
        [controller]
    )
    const http = useCallback(
        async (method, url, options = {}) => {
            options.signal = controller.signal

            setLoading(true)
            const response = await fetch.http(method, url, options)
            setLoading(false)

            return response
        },
        [controller]
    )

    
    return {
        get,
        post,
        http,
        abort,
        loading,
    }
}

export default useAPI
