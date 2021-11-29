import { useState } from 'react'

export const useCounter = (initialState = 10) => {
    const [counter, setCounter] = useState(initialState)
    const sanitize = value => (isNaN(value) ? 1 : value)
    const increment = factor => setCounter(state => state + sanitize(factor))
    const decrement = factor => setCounter(state => state - sanitize(factor))
    const reset = () => setCounter(initialState)

    return {
        counter,
        increment,
        decrement,
        reset,
    }
}
