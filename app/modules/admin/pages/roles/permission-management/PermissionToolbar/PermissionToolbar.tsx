import { HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import DocumentTypeFilter from './DocumentTypeFilter'
import { PermissionActions } from './PermissionActions'
import RoleFilter from './RoleFilter'

export default function PermissionToolbar() {
    return (
        <Stack
            spacing={{ base: 2, md: 0 }}
            gap={[0, 0, 2]}
            flexDir={{ base: 'column', md: 'row' }}
            justify={'end'}
        >
            <HStack justify={'end'}>
                <DocumentTypeFilter />
                <RoleFilter />
            </HStack>
            <PermissionActions />
        </Stack>
    )
}
