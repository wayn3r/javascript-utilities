import { useState, useEffect, useRef } from 'react'

const initialState = { data: null, loading: true, error: null }

export const useFetch = url => {
    const isMounted = useRef(true)
    const [state, setState] = useState(initialState)
    useEffect(() => () => (isMounted.current = false), [])
    useEffect(() => {
        setState(initialState)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (isMounted.current)
                    setState({ data, loading: false, error: null })
            })
            .catch(() => {
                if (isMounted.current)
                    setState({
                        data: null,
                        loading: false,
                        error: 'Error al realizar la petición',
                    })
            })
    }, [url])
    return state
}
