import { renderHook } from '@testing-library/react-hooks'
import { useFetch } from '../../hooks'

describe('Pruebas en useFetch', () => {
    const initialState = {
        loading: true,
        error: null,
        data: null,
    }
    test('debe de devolver la informacion por defecto', () => {
        const { result } = renderHook(() =>
            useFetch('https://jsonplaceholder.typicode.com/users')
        )
        const state = result.current
        expect(state).toEqual(initialState)
    })

    test('debe de tener la data, loading en false, error null', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch('https://jsonplaceholder.typicode.com/users')
        )

        await waitForNextUpdate()

        const { data, loading, error } = result.current
        expect(error).toBe(null)
        expect(loading).toBe(false)
        expect(data instanceof Array).toBe(true)
    })
    test('debe de manejar el error', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch('https://jsonplaceholder.typicode.com')
        )

        await waitForNextUpdate()

        const { data, loading, error } = result.current
        expect(error).toBe('Error al realizar la petición')
        expect(data).toBe(null)
        expect(loading).toBe(false)
    })
})
