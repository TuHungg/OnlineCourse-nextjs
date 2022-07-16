import {
    Box,
    Heading,
    HStack,
    Icon,
    Stack,
    Text,
    useColorModeValue,
    useTheme,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'
import {
    INSTRUCTOR_SIDEBAR_EXPANDED_WIDTH,
    INSTRUCTOR_SIDEBAR_PRIMARY_WIDTH,
    useInstructorSidebarWidth,
} from '../../hooks/instructor-sidebar-width.hook'
import {
    INavGroup,
    INavItem,
    INSTRUCTOR_MENU_DATA,
    useInstructorMenu,
} from '../../providers/instructor-menu.provider'
import { useInstructorParams } from '../../providers/instructor-params.provider'
import { TInstructorSection } from '../../types/instructor-section.type'

const PrimaryBar = () => {
    const renderItem = useCallback((item: INavGroup, i: number) => {
        return <InstructorSidebarPrimaryItem key={i} item={item} />
    }, [])

    return (
        <Stack
            pos="absolute"
            left={0}
            top={0}
            bottom={0}
            w={INSTRUCTOR_SIDEBAR_PRIMARY_WIDTH + 'px'}
            overflow="hidden"
            bg="black"
            spacing={0}
            sx={{
                transition: 'width .5s',
                '&:hover': {
                    w: INSTRUCTOR_SIDEBAR_EXPANDED_WIDTH + 'px',
                    '.nav-item-label': {
                        opacity: 1,
                    },
                },
            }}
        >
            <HStack>
                <Heading p={4} pl={6} fontSize={'2xl'} color="purple.300" whiteSpace={'nowrap'}>
                    O
                    <Text
                        as="span"
                        fontSize={'2xl'}
                        opacity={0}
                        className="nav-item-label"
                        transition={'opacity .5s'}
                    >
                        nline Courses
                    </Text>
                </Heading>
            </HStack>
            {INSTRUCTOR_MENU_DATA.map(renderItem)}
        </Stack>
    )
}

export const InstructorSidebarPrimaryItem = ({ item }: { item: INavGroup }) => {
    const theme = useTheme()
    const hoverColor = theme.colors.gray[700]
    const {
        state: {
            urlParams: { section, sub },
        },
    } = useInstructorParams()
    const isActive = section == item.path
    return (
        <NextLink href={PathHelper.getInstructorPath(item.path, item.items?.at(0)?.path)}>
            <HStack
                borderLeft={'5px solid'}
                borderColor={isActive ? 'purple.300' : 'transparent'}
                _hover={{ bgColor: hoverColor }}
                p={4}
                spacing={8}
                transition="background-color .1s"
            >
                <Icon color="whitesmoke" fontSize={'2xl'} as={item.icon} />
                <Text
                    as="span"
                    fontWeight={'bold'}
                    className="nav-item-label"
                    color="whitesmoke"
                    opacity={0}
                    sx={{ transition: 'opacity .5s' }}
                >
                    {item.label}
                </Text>
            </HStack>
        </NextLink>
    )
}

export const SubBar = () => {
    const {
        state: { activeNavGroup },
    } = useInstructorMenu()
    const renderItem = useCallback(
        (item: INavItem, i: number) => {
            return <SubItem key={i} item={item} section={activeNavGroup?.path || 'courses'} />
        },
        [activeNavGroup?.path]
    )
    if (!activeNavGroup) return <></>
    return <Stack p={10}>{activeNavGroup.items?.map(renderItem)}</Stack>
}

const SubItem = ({ item, section }: { item: INavItem } & { section: TInstructorSection }) => {
    const {
        state: {
            urlParams: { sub },
        },
    } = useInstructorParams()
    return (
        <HStack>
            <NextLink href={PathHelper.getInstructorPath(section, item.path)}>
                <Text fontWeight={sub == item.path ? 'bold' : undefined}>{item.label}</Text>
            </NextLink>
        </HStack>
    )
}

function InstructorSidebar() {
    const sidebarWidth = useInstructorSidebarWidth()
    const bgColor = useColorModeValue('bg.50', 'gray.700')
    return (
        <Box
            pos="fixed"
            top={0}
            left={0}
            bottom={0}
            zIndex={'sticky'}
            w={sidebarWidth + 'px'}
            bg={bgColor}
        >
            <PrimaryBar />
            <Box pl={INSTRUCTOR_SIDEBAR_PRIMARY_WIDTH + 'px'}>
                <SubBar />
            </Box>
        </Box>
    )
}

export default React.memo(InstructorSidebar)
