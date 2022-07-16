import { useBreakpointValue } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Helper from '../../../utils/helpers/helper.helper'

export const useIsMounted = () => {
    const [isMounted, setMounted] = useState<boolean>(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    return isMounted
}

export const useStatus = () => {
    const [isMounted, setMounted] = useState<boolean>(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    return { isMounted }
}

export const useDevice = () => {
    const [mounted, setMounted] = useState(false)
    const isMobile = useBreakpointValue({
        base: true,
        lg: false,
    })
    useEffect(() => {
        setMounted(true)
    }, [])
    return {
        isMobile: mounted && isMobile,
    }
}

function useDeepCompareMemoize(value: any) {
    const ref = useRef<any[]>()
    if (!Helper.lodash.isEqual(value, ref.current)) {
        ref.current = value
    }
    return ref.current
}

// CUSTOM
export const useDeepCompareEffect = (callback: () => void, dependencies: any[]) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(callback, dependencies.map(useDeepCompareMemoize))
}
export const useDeepCompareCallback = <T>(callback: (...args: any) => T, dependencies: any[]) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(callback, dependencies.map(useDeepCompareMemoize))
}
export function useDeepCompareMemo<T>(callback: (...args: any) => T, dependencies: any[]): T {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(callback, dependencies.map(useDeepCompareMemoize))
}
