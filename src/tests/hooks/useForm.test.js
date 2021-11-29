import { act, renderHook } from '@testing-library/react-hooks'
import { useForm } from '../../hooks'

describe('Pruebas en useForm', () => {
    const initialForm = {
        name: 'Wayner',
        email: 'wayner@example.com',
    }

    test('debe de devolver el initialState en la primera posicion', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const [form, handleChange, reset] = result.current

        expect(form).toEqual(initialForm)
        expect(handleChange instanceof Function).toBe(true)
        expect(reset instanceof Function).toBe(true)
    })

    test('debe de cambiar el valor del name', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const [, handleChange] = result.current

        const value = 'Wayner De La Cruz'

        act(() => handleChange({ target: { name: 'name', value } }))
        const [form] = result.current
        expect(form).toEqual({ ...initialForm, name: value })
    })

    test('debe de reestablecer el formulario al llamar RESET', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const [, handleChange, reset] = result.current
        const value = 'Wayner De La Cruz'

        act(() => {
            handleChange({ target: { name: 'name', value } })
            reset()
        })
        const [form] = result.current
        expect(form).toEqual(initialForm)
    })
})
