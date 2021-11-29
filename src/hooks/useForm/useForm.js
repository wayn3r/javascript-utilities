import { useState } from 'react'
/**
 *
 * @param {Object} initialState
 * @returns [{Object}, Function]
 */
export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState)
    const reset = () => setValues(initialState)
    const handleInputChange = ({ target }) => {
        const { name, value } = target
        setValues(state => ({ ...state, [name]: value }))
    }

    return [values, handleInputChange, reset]
}
