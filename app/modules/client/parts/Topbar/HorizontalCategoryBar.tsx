import { Box, HStack, Stack, Text, TextProps, useTheme, VStack } from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'
import {
    ClientMenuProvider,
    ICatInfo,
    ISecondLevelCatInfo,
    useClientMenu,
} from '../../providers/client-menu.provider'
import { useClientParams } from '../../providers/client-params.provider'

const PrimaryCatItem = ({ slug, name, ...props }: ICatInfo & TextProps) => {
    const {
        state: { hoveredPrimaryCat },
    } = useClientMenu()
    const theme = useTheme()
    const color = theme.colors.purple[500]
    return (
        <NextLink href={PathHelper.getCategoryPath(slug)}>
            <Text
                color={slug == hoveredPrimaryCat?.slug ? color : undefined}
                _hover={{ color }}
                py={4}
                {...props}
            >
                {name}
            </Text>
        </NextLink>
    )
}

const SubCatItem = (props: { primarySlug: string } & ICatInfo) => {
    const theme = useTheme()
    return (
        <NextLink href={PathHelper.getCategoryPath(props.primarySlug, props.slug)}>
            <Text whiteSpace={'nowrap'} _hover={{ color: theme.colors.purple[200] }}>
                {props.name}
            </Text>
        </NextLink>
    )
}

const PrimaryCatBar = () => {
    const {
        state: { cats },
        methods: { setHoveredPrimaryCat },
    } = useClientMenu()
    const catsHtml = cats.map((item, i) => {
        return (
            <PrimaryCatItem
                onMouseEnter={() => setHoveredPrimaryCat(item)}
                key={i}
                name={item.name}
                slug={item.slug}
            />
        )
    })
    return <HStack spacing={8}>{catsHtml}</HStack>
}

const SubCatBar = (props: { primaryCat: ISecondLevelCatInfo }) => {
    const catsHtml = props.primaryCat.subCats.map((item, i) => {
        return (
            <SubCatItem
                key={i}
                name={item.name}
                primarySlug={props.primaryCat.slug}
                slug={item.slug}
            />
        )
    })
    return <HStack spacing={4}>{catsHtml}</HStack>
}

const Main = () => {
    const {
        state: { hoveredPrimaryCat },
        methods: { setHoveredPrimaryCat },
    } = useClientMenu()
    const {
        state: { showHCatBar },
    } = useClientParams()
    // const borderColor = useBorderColor()
    if (!showHCatBar) return <></>
    return (
        <Box minH="56px">
            <VStack spacing={4} justify={'center'} pos="relative">
                <Stack onMouseLeave={() => setHoveredPrimaryCat(undefined)}>
                    <PrimaryCatBar />
                    <HStack
                        pos="absolute"
                        zIndex={1}
                        left={0}
                        top="40px"
                        display={hoveredPrimaryCat ? 'flex' : 'none'}
                        w="full"
                        bg="gray.800"
                        color="white"
                        py={4}
                        justify="center"
                        overflow={'auto'}
                        className="my-scrollbar-1"
                    >
                        {hoveredPrimaryCat && <SubCatBar primaryCat={hoveredPrimaryCat} />}
                    </HStack>
                </Stack>
            </VStack>
        </Box>
    )
}

function HorizontalCategoryBar() {
    return (
        <ClientMenuProvider>
            <Main />
        </ClientMenuProvider>
    )
}

export default React.memo(HorizontalCategoryBar)
