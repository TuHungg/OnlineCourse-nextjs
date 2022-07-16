import {
    CSSObject,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Heading,
    List,
    ListIcon,
    ListItem,
    Stack,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactNode, useMemo } from 'react'
import { BsCircle } from 'react-icons/bs'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'
import { INavGroup } from '../../../shared/interfaces/nav-group.interface'
import { INavItem } from '../../../shared/interfaces/nav-item.interface'
import { useSidebar } from '../../../shared/providers/sidebar.provider'
import { useCourseFormParams } from '../../hooks/course-form-params.hook'
import { useIsCourseFormMobile } from '../../hooks/is-course-form-mobile.hook'
import { TCourseFormSection } from '../../types/course-form-sectiontype'
import CourseActions from '../CourseActions'

interface ICourseFormNavItem extends INavItem {
    section: TCourseFormSection
}

interface ICourseFormNavGroup extends INavGroup {
    items: ICourseFormNavItem[]
}

const navGroups: ICourseFormNavGroup[] = [
    {
        title: 'Plan your course',
        items: [
            {
                title: 'Intended learners',
                section: 'goal',
            },
        ],
    },
    {
        title: 'Create your content',
        items: [
            {
                title: 'Curriculum',
                section: 'curriculum',
            },
            // {
            //     title: 'Captions',
            //     section: 'captions',
            // },
        ],
    },
    {
        title: 'Publish your course',
        items: [
            {
                title: 'Course landing page',
                section: 'basics',
            },
            {
                title: 'Pricing',
                section: 'pricing',
            },
            // {
            //     title: 'Promotions',
            //     section: 'promotions',
            // },
            {
                title: 'Promotions',
                section: 'promotions',
            },
            {
                title: 'Course messages',
                section: 'messages',
            },
        ],
    },
]

const NavItem = (props: ICourseFormNavItem) => {
    const { id, section } = useCourseFormParams()
    const navHoverBgColor = useColorModeValue('gray.100', 'gray.700')
    const isActive = section == props.section
    const activeStyle = useColorModeValue(
        { boxShadow: '-5px 0px black' } as CSSObject,
        { boxShadow: '-5px 0px gray' } as CSSObject
    )
    const router = useRouter()
    return (
        <NextLink href={PathHelper.getCourseFormPath(id, props.section, router.pathname)}>
            <ListItem
                py={2}
                pl={8}
                transitionProperty="boxShadow"
                transitionDuration="normal"
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        bgColor: navHoverBgColor,
                    },
                    ...(isActive ? activeStyle : {}),
                }}
            >
                <ListIcon as={BsCircle} w={5} h={5} />
                {props.title}
            </ListItem>
        </NextLink>
    )
}

const NavGroup = (props: ICourseFormNavGroup) => {
    const navItemsHtml = useMemo(() => {
        return props.items.map((item) => {
            return <NavItem key={item.title} {...item} />
        })
    }, [props.items])
    return (
        <Stack spacing={2}>
            <Heading pl={8} fontSize="lg">
                {props.title}
            </Heading>
            <List>{navItemsHtml}</List>
        </Stack>
    )
}

const SidebarWrapper = ({ children }: { children: ReactNode }) => {
    const { isOpen, onClose } = useSidebar()
    const isMobile = useIsCourseFormMobile()
    return (
        <>
            {isMobile ? (
                <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent maxW="250px">
                        <DrawerBody p={0}>{children}</DrawerBody>
                    </DrawerContent>
                </Drawer>
            ) : (
                children
            )}
        </>
    )
}

export default function Sidebar() {
    const navGroupHtml = useMemo(() => {
        return navGroups.map((item) => {
            return <NavGroup key={item.title} {...item} />
        })
    }, [])
    const isMobile = useBreakpointValue({ base: true, xl: false })
    return (
        <SidebarWrapper>
            <Stack
                spacing={4}
                p={5}
                maxW={{
                    lg: '250px',
                }}
            >
                <Stack mt={7} flexDir={'column'} spacing={10} boxSizing="content-box">
                    {navGroupHtml}
                </Stack>
                {!isMobile && <CourseActions />}
            </Stack>
        </SidebarWrapper>
    )
}
