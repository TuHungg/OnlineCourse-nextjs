import { Icon, IconButton } from '@chakra-ui/react';
import React from 'react'
import { FiMenu } from 'react-icons/fi';
import CustomIconButton from '../../../shared/components/CustomIconButton';
import { useAdminSidebar } from '../../providers/admin-sidebar.provider';

export default function NavSizeToggler() {
    const { toggleNavSize } = useAdminSidebar();
    return (
        <CustomIconButton
            onClick={toggleNavSize}
            aria-label="menu"
            icon={<Icon as={FiMenu} />}
        ></CustomIconButton>
    )
}
