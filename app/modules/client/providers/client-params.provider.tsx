import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useQueryMessage } from '../../shared/hooks/query-message'

interface ClientParamsProvider {
    state: {
        showHCatBar: boolean
        showFilter: boolean
    }
    methods: {
        setShowHCatBar: (val: boolean) => void
        toggleFilter: () => void
    }
}
const ClientParamsContext = createContext<ClientParamsProvider>({} as ClientParamsProvider)

export const useClientParams = () => {
    return useContext(ClientParamsContext)
}

export function ClientParamsProvider({ children }: { children: ReactNode }) {
    const [showHCatBar, setShowHCatBar] = useState<boolean>(true)
    const [showFilter, setShowFilter] = useState<boolean>(true)

    //
    const { toastMessage } = useQueryMessage()
    useEffect(() => {
        toastMessage()
    }, [toastMessage])

    //
    const toggleFilter = useCallback(() => {
        setShowFilter((value) => !value)
    }, [])

    const state = useMemo(() => {
        return {
            state: {
                showHCatBar,
                showFilter,
            },
            methods: {
                setShowHCatBar,
                toggleFilter,
            },
        }
    }, [showFilter, showHCatBar, toggleFilter])
    return <ClientParamsContext.Provider value={state}>{children}</ClientParamsContext.Provider>
}
