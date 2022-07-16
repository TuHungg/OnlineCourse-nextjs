import { Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { useAdminSidebar } from '../providers/admin-sidebar.provider'

export default function AdminSidebarToggler() {
    const { onToggle: toggleSidebar } = useAdminSidebar()
    return (
        <div>
            <IconButton
                onClick={toggleSidebar}
                aria-label="toggle-sidebar"
                icon={<Icon as={FiMenu} />}
            />
        </div>
    )
}
