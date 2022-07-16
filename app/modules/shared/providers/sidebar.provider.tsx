import { useDisclosure } from '@chakra-ui/react'
import React, { createContext, ReactNode, useContext, useMemo } from 'react'

interface SidebarProvider {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
}
const SidebarContext = createContext<SidebarProvider>({} as SidebarProvider)

export const useSidebar = () => {
    return useContext(SidebarContext)
}

export function SidebarProvider({
    defaultIsOpen,
    children,
}: {
    defaultIsOpen?: boolean
    children: ReactNode
}) {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure({ defaultIsOpen })
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
    return <SidebarContext.Provider value={state}>{children}</SidebarContext.Provider>
}
