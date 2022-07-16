import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
} from '@chakra-ui/react'
import React from 'react'
import { useSidebar } from '../../../shared/providers/sidebar.provider'
import LearnCurriculum from '../../parts/LearnSidebar/LearnCurriculum/LearnCurriculum'

export default function LearnMobileSidebar() {
    const { isOpen, onClose } = useSidebar()
    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                    <HStack justify={'space-between'}>
                        <Heading fontSize={'lg'}>Course content</Heading>
                        <DrawerCloseButton />
                    </HStack>
                </DrawerHeader>
                <DrawerBody px={0} py={0}>
                    <LearnCurriculum />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}
