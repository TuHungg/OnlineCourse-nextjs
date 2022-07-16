import { Box, HStack, Icon, Stack, StackDivider, Text, TextProps } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'
import { useCardBg } from '../../../shared/hooks/style.hook'
import { useActiveColor } from '../../hooks/style.hook'
import { ClientMenuProvider, ICatInfo, useClientMenu } from '../../providers/client-menu.provider'

const PrimaryCatItem = ({ slug, name, onMouseEnter, ...props }: ICatInfo & TextProps) => {
    const {
        state: { hoveredPrimaryCat },
    } = useClientMenu()
    const color = useActiveColor()
    return (
        <NextLink href={PathHelper.getCategoryPath(slug)}>
            <HStack
                color={slug == hoveredPrimaryCat?.slug ? color : undefined}
                _hover={{ color }}
                justify="space-between"
                onMouseEnter={onMouseEnter}
            >
                <Text {...props}>{name}</Text>
                <Icon as={AppIcon.arrowRight} />
            </HStack>
        </NextLink>
    )
}

const SubCatItem = (props: { primarySlug: string } & ICatInfo) => {
    const color = useActiveColor()
    return (
        <NextLink href={PathHelper.getCategoryPath(props.primarySlug, props.slug)}>
            <Text _hover={{ color }}>{props.name}</Text>
        </NextLink>
    )
}

const PrimaryCatColumn = () => {
    const {
        state: { cats },
        methods: { setHoveredPrimaryCat },
    } = useClientMenu()
    const catItemsHtml = cats.map((item) => {
        return (
            <PrimaryCatItem
                onMouseEnter={() => setHoveredPrimaryCat(item)}
                key={item.slug}
                slug={item.slug}
                name={item.name}
            />
        )
    })
    return <Stack spacing={4}>{catItemsHtml}</Stack>
}
const SubCatColumn = () => {
    const {
        state: { hoveredPrimaryCat },
    } = useClientMenu()
    const catItemsHtml = hoveredPrimaryCat?.subCats.map((item, i) => (
        <SubCatItem
            key={item.slug}
            primarySlug={hoveredPrimaryCat.slug}
            name={item.name}
            slug={item.slug}
        />
    ))
    return <Stack spacing={4}>{catItemsHtml}</Stack>
}

const Main = () => {
    const {
        state: { hoveredPrimaryCat },
        methods: { setHoveredPrimaryCat },
    } = useClientMenu()
    const menuBg = useCardBg()
    const color = useActiveColor()
    return (
        <Box
            sx={{
                '&:hover': {
                    '> .menu': {
                        display: 'flex !important',
                    },
                },
            }}
            pos="relative"
        >
            <Text sx={{ cursor: 'pointer' }} _hover={{ color }}>
                Categories
            </Text>
            <Box pt={'16px'} className="menu" pos="absolute" zIndex="sticky" display={'none'}>
                <HStack
                    alignItems={'start'}
                    w="100%"
                    bg={menuBg}
                    left={0}
                    border={'1px solid'}
                    color="gray.500"
                    borderRadius={5}
                    divider={<StackDivider borderColor={'gray.500'} />}
                    px={2}
                >
                    <Box flex={1} p={4} w="250px">
                        <PrimaryCatColumn />
                    </Box>
                    {hoveredPrimaryCat ? (
                        <Box flex={1} p={4} w="250px">
                            <SubCatColumn />
                        </Box>
                    ) : null}
                </HStack>
            </Box>
        </Box>
    )
}
export default function PopoverCategory() {
    return (
        <ClientMenuProvider>
            <Main />
        </ClientMenuProvider>
    )
}
