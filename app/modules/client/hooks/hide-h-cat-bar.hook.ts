import { useEffect } from 'react'
import { useClientParams } from '../providers/client-params.provider'

export const useHideHCatBar = () => {
    const {
        methods: { setShowHCatBar },
    } = useClientParams()
    useEffect(() => {
        setShowHCatBar(false)
        return () => {
            setShowHCatBar(true)
        }
    }, [setShowHCatBar])
}
