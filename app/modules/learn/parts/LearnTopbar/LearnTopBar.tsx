import { Box, Flex, HStack, StackDivider, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import ThemeButton from '../../../admin/components/ThemeButton'
import AppHeading from '../../../client/components/AppHeading'
import NotificationButton from '../../../shared/components/NotificationButton/NotificationButton'
import ProfilePopover from '../../../shared/components/ProfileBox/ProfilePopover'
import { useBorderColor } from '../../../shared/hooks/style.hook'
import { useIsLearnMobile } from '../../hooks/is-learn-mobile.hook'
import LearnCourseTitle from './LearnCourseTitle'
import LearnMenu from './LearnMenu'
import LearnProgress from './LearnProgress'

export const LEARN_TOP_BAR_HEIGHT = 55
export default function LearnTopBar() {
    const borderColor = useBorderColor()
    const border = useColorModeValue(undefined, '1px solid')
    const isMobile = useIsLearnMobile()
    return (
        <HStack
            h={LEARN_TOP_BAR_HEIGHT + 'px'}
            p={{ base: 2, lg: 4 }}
            // bgColor="gray.900"
            borderBottom={border}
            borderColor={borderColor}
            justify="space-between"
            shadow="md"
        >
            <HStack divider={!isMobile ? <StackDivider /> : undefined} spacing={5}>
                <AppHeading />
                <LearnCourseTitle />
            </HStack>
            <Flex alignItems={'center'}>
                <Box display={{ base: 'none', md: 'block' }}>
                    <LearnProgress />
                </Box>
                <Box ml={8} display={{ base: 'none', md: 'block' }}>
                    <LearnMenu />
                </Box>
                <Box ml={2}>
                    <ThemeButton size="sm" />
                </Box>
                <Box ml={2} display={{ base: 'none', md: 'block' }}>
                    <NotificationButton variant={'solid'} size="sm" />
                </Box>
                <Box ml={2}>
                    <ProfilePopover size={isMobile ? 'sm' : 'md'} />
                </Box>
            </Flex>
        </HStack>
    )
}
