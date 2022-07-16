import { Heading, HStack, Icon, IconButton, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import { useSidebar } from '../../../shared/providers/sidebar.provider'
import { LEARN_TOP_BAR_HEIGHT } from '../LearnTopbar/LearnTopBar'
import LearnCurriculum from './LearnCurriculum/LearnCurriculum'

const SidebarHeading = () => {
    const { onClose } = useSidebar()
    return (
        <HStack pl={4} pr={1} py={2} justify="space-between">
            <Heading fontSize={'lg'}>Course content</Heading>
            <IconButton
                onClick={onClose}
                variant={'unstyled'}
                aria-label=""
                icon={<Icon as={AppIcon.x} />}
            />
        </HStack>
    )
}

export default function LearnSidebar() {
    const [top, setTop] = useState<number>(0)

    useEffect(() => {
        const trackTop = () => {
            const scrollY = window.scrollY
            if (scrollY <= LEARN_TOP_BAR_HEIGHT) setTop(LEARN_TOP_BAR_HEIGHT - scrollY)
            else {
                setTop(0)
            }
        }
        trackTop()
        document.addEventListener('scroll', trackTop)
        return () => {
            document.removeEventListener('scroll', trackTop)
        }
    }, [])
    const { isOpen } = useSidebar()
    return (
        <Stack
            display={{ base: 'none', lg: 'flex' }}
            sx={{
                transition: 'transform .3s',
                transform: `translateX(${!isOpen ? '360px' : '0px'})`,
            }}
            w="360px"
            pos="fixed"
            top={`${top}px`}
            right={0}
            h={`calc(100vh - ${top}px)`}
            shadow="md"
        >
            <SidebarHeading />
            <LearnCurriculum />
        </Stack>
    )
}
