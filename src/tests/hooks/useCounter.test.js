import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from '../../hooks'

describe('Pruebas en useCounter', () => {
    test('Debe de retornar un valor por defecto de 10', () => {
        const { result } = renderHook(() => useCounter())
        const { counter, increment, decrement, reset } = result.current

        expect(counter).toBe(10)
        expect(increment instanceof Function).toBe(true)
        expect(decrement instanceof Function).toBe(true)
        expect(reset instanceof Function).toBe(true)
    })
    test('Debe de retornar un valor por defecto enviado al initialState', () => {
        const value = 501
        const { result } = renderHook(() => useCounter(value))
        expect(result.current.counter).toBe(value)
    })
    test('Debe de incrementar el counter en 1', () => {
        const value = 501
        const { result } = renderHook(() => useCounter(value))
        const { increment } = result.current
        act(() => increment())
        const { counter } = result.current
        expect(counter).toBe(value + 1)
    })
    test('Debe de disminuir el counter en 1', () => {
        const value = 501
        const { result } = renderHook(() => useCounter(value))
        const { decrement } = result.current
        act(() => decrement())
        const { counter } = result.current
        expect(counter).toBe(value - 1)
    })
    test('Debe de devoler el counter al valor inicial', () => {
        const value = 501
        const { result } = renderHook(() => useCounter(value))
        const { decrement, reset } = result.current
        act(() => {
            decrement(100)
            reset()
        })
        const { counter } = result.current
        expect(counter).toBe(value)
    })
})
