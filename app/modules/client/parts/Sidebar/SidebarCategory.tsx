import { HStack, Icon, Stack, Text, TextProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'
import { useActiveColor } from '../../hooks/style.hook'
import { ICatInfo, ISecondLevelCatInfo, useClientMenu } from '../../providers/client-menu.provider'

const PrimaryCatItem = ({ subCats, slug, name, ...props }: ISecondLevelCatInfo & TextProps) => {
    const {
        state: { hoveredPrimaryCat },
        methods: { setHoveredPrimaryCat },
    } = useClientMenu()
    const color = useActiveColor()
    return (
        <HStack
            color={slug == hoveredPrimaryCat?.slug ? color : undefined}
            _hover={{ color }}
            justify="space-between"
            onClick={() => setHoveredPrimaryCat({ slug, name, subCats })}
        >
            <NextLink href={PathHelper.getCategoryPath(slug)}>
                <Text {...props}>{name}</Text>
            </NextLink>
            <Icon as={AppIcon.arrowRight} />
        </HStack>
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

const PrimaryCatList = () => {
    const {
        state: { cats },
    } = useClientMenu()
    const catItemsHtml = cats.map((item) => {
        return (
            <PrimaryCatItem
                key={item.slug}
                slug={item.slug}
                name={item.name}
                subCats={item.subCats}
            />
        )
    })
    return <Stack spacing={4}>{catItemsHtml}</Stack>
}

export const SidebarSubCatList = () => {
    const {
        state: { hoveredPrimaryCat },
        methods: { setHoveredPrimaryCat },
    } = useClientMenu()
    const catItemsHtml = hoveredPrimaryCat?.subCats.map((item, i) => (
        <SubCatItem
            key={item.slug}
            primarySlug={hoveredPrimaryCat.slug}
            name={item.name}
            slug={item.slug}
        />
    ))
    const backBg = useColorModeValue('gray.50', 'gray.600')
    return (
        <Stack spacing={4}>
            <HStack
                onClick={() => setHoveredPrimaryCat(undefined)}
                p={2}
                borderRadius={5}
                bgColor={backBg}
                sx={{ cursor: 'pointer' }}
            >
                <Icon as={AppIcon.arrowLeft} />
                <Text> Back </Text>
            </HStack>
            {catItemsHtml}
        </Stack>
    )
}

export default function SidebarCategory() {
    return (
        <Stack spacing={4}>
            <PrimaryCatList />
        </Stack>
    )
}
