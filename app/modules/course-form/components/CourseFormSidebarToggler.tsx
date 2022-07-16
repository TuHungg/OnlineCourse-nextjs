import { Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { useSidebar } from '../../shared/providers/sidebar.provider';

export default function AdminSidebarToggler() {
    const { onToggle: toggleSidebar } = useSidebar();
    return (
        <div>

            <IconButton
                onClick={toggleSidebar}
                aria-label='toggle-sidebar'
                icon={<Icon as={FiMenu} />}
            />
        </div>
    )
}
