import { ButtonProps, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'
import { useSidebar } from '../providers/sidebar.provider'

export interface SidebarTogglerProps extends ButtonProps {}
export default function SidebarToggler(props: SidebarTogglerProps) {
    const { onToggle } = useSidebar()
    return (
        <IconButton
            onClick={onToggle}
            aria-label="toggle-sidebar"
            icon={<Icon as={AppIcon.menu} />}
            variant="ghost"
            {...props}
        />
    )
}
