import { useEffect, useState } from "react"

export const useTop = () => {
    const [isTop, setTop] = useState(true)
    useEffect(() => {
        const handleScroll = () => setTop(window.scrollY == 0)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return isTop
}