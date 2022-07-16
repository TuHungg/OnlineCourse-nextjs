import { useDisclosure } from '@chakra-ui/react'
import React, { createContext, ReactNode, useContext, useMemo } from 'react'

export interface IMobileSearchProvider {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
}

const MobileSearchContext = createContext<IMobileSearchProvider>({} as IMobileSearchProvider)

export const useMobileSearch = () => {
    return useContext(MobileSearchContext)
}

export function MobileSearchProvider({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
    //
    const state = useMemo(
        () => ({
            isOpen,
            onOpen,
            onClose,
            onToggle,
        }),
        [isOpen, onClose, onOpen, onToggle]
    )
    return <MobileSearchContext.Provider value={state}>{children}</MobileSearchContext.Provider>
}
