import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    HStack,
    Icon,
    Stack,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { useCallback, useState } from 'react'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'
import { useSidebar } from '../../shared/providers/sidebar.provider'
import { INavGroup, INavItem, INSTRUCTOR_MENU_DATA } from '../providers/instructor-menu.provider'
import { useInstructorParams } from '../providers/instructor-params.provider'
import { TInstructorSection } from '../types/instructor-section.type'
const SubBar = ({ navGroup }: { navGroup: INavGroup }) => {
    const renderItem = useCallback(
        (item: INavItem, i: number) => {
            return <SubItem key={i} item={item} section={navGroup.path} />
        },
        [navGroup.path]
    )
    if (!navGroup.items?.length) return <></>
    return <Stack pl={10}>{navGroup.items?.map(renderItem)}</Stack>
}

const SubItem = ({ item, section }: { item: INavItem; section: TInstructorSection }) => {
    const { onClose } = useSidebar()
    const {
        state: {
            urlParams: { sub },
        },
    } = useInstructorParams()
    return (
        <NextLink href={PathHelper.getInstructorPath(section, item.path)}>
            <Text onClick={onClose} fontWeight={sub == item.path ? 'bold' : undefined}>
                {item.label}
            </Text>
        </NextLink>
    )
}

const PrimaryItem = ({ item }: { item: INavGroup }) => {
    const { onClose } = useSidebar()
    const {
        state: {
            urlParams: { section, sub },
        },
    } = useInstructorParams()

    const isActive = section == item.path
    return (
        <Stack>
            <NextLink href={PathHelper.getInstructorPath(item.path, item.items?.at(0)?.path)}>
                <HStack spacing={4} onClick={onClose}>
                    <Icon
                        fontWeight={isActive ? 'bold' : 'normal'}
                        fontSize={'2xl'}
                        as={item.icon}
                    />
                    <Text fontSize={'xl'} as="span" fontWeight={isActive ? 'bold' : 'normal'}>
                        {item.label}
                    </Text>
                </HStack>
            </NextLink>
            <SubBar navGroup={item} />
        </Stack>
    )
}

const PrimaryBar = () => {
    const renderItem = useCallback((item: INavGroup, i: number) => {
        return <PrimaryItem key={i} item={item} />
    }, [])

    return (
        <Stack spacing={4} pt={10}>
            {INSTRUCTOR_MENU_DATA.map(renderItem)}
        </Stack>
    )
}
const Main = () => {
    const [] = useState()
    // const {
    //     state: {
    //         urlParams: { section, sub },
    //     },
    // } = useInstructorParams()
    // const {
    //     state: { activeNavGroup },
    // } = useInstructorMenu()
    // if (activeNavGroup?.items?.length && activeNavGroup?.items?.length > 0)
    //     return (
    //         <Stack>
    //             <Button>Back</Button>
    //             <InstructorSubBar />
    //         </Stack>
    //     )
    return <PrimaryBar />
}

function InstructorMobileSidebar() {
    const { isOpen, onClose } = useSidebar()
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                    <Main />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default React.memo(InstructorMobileSidebar)
