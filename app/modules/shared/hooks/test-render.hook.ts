import { useEffect, useState } from 'react'

export const useTestRender = () => {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        setInterval(() => {
            setCounter((val) => {
                const newVal = val + 1
                console.info(`counter: ${newVal}`)
                return newVal
            })
        }, 1000)
    }, [])
}
