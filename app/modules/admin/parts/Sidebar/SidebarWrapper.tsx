import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useDevice } from '../../../shared/hooks/app.hook'
import { useAdminSidebar } from '../../providers/admin-sidebar.provider'
import { ADMIN_SIDEBAR_EXPANDED_WIDTH } from './Sidebar'

export default function SidebarWrapper({ children }: { children: ReactNode }) {
    const { isOpen, onClose } = useAdminSidebar()
    const { isMobile } = useDevice()
    return (
        <>
            {isMobile ? (
                <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent maxW={ADMIN_SIDEBAR_EXPANDED_WIDTH + 'px'}>
                        <DrawerBody p={0}>{children}</DrawerBody>
                    </DrawerContent>
                </Drawer>
            ) : (
                children
            )}
        </>
    )
}
