import { useDisclosure } from '@chakra-ui/react'
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { NavSize } from '../parts/Sidebar/Sidebar'

interface AdminSidebar {
    navSize: NavSize
    toggleNavSize: () => void
    isOpen: boolean
    onClose: () => void
    onToggle: () => void
}
const AdminSidebarContext = createContext<AdminSidebar>({} as AdminSidebar)

export const useAdminSidebar = () => {
    return useContext(AdminSidebarContext)
}

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
    const [navSize, setNavSize] = useState<NavSize>('large')
    const { isOpen, onClose, onToggle } = useDisclosure()
    const toggleNavSize = useCallback(() => {
        setNavSize(navSize == 'small' ? 'large' : 'small')
    }, [navSize])

    const state: AdminSidebar = useMemo(
        () => ({
            navSize,
            toggleNavSize,
            isOpen,
            onToggle,
            onClose,
        }),
        [isOpen, navSize, onClose, onToggle, toggleNavSize]
    )
    return <AdminSidebarContext.Provider value={state}>{children}</AdminSidebarContext.Provider>
}
