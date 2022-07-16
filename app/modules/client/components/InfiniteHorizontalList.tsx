import { Button, ButtonGroup, GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import React, { ReactNode, useCallback } from 'react'
import IModel from '../../shared/interfaces/models/model.interface'

export interface InfiniteHorizontalListProps<T extends IModel> {
    list: T[]
    fetchNextPage?: () => void
    hasNextPage?: boolean
    isLoading?: boolean
    renderItem: (item: T, i: number) => ReactNode
}
export default function InfiniteHorizontalList<T extends IModel>({
    renderItem: onRenderItem,
    list,
    fetchNextPage,
    hasNextPage,
}: InfiniteHorizontalListProps<T>) {
    const renderItem = useCallback(
        (item: T, i) => {
            return (
                <GridItem key={item._id} colSpan={1}>
                    {onRenderItem(item, i)}
                </GridItem>
            )
        },
        [onRenderItem]
    )
    return (
        <Stack>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={[2, 4, 8]}>
                {list.map(renderItem)}
            </SimpleGrid>

            {!!hasNextPage && !!fetchNextPage ? (
                <ButtonGroup justifyContent={'center'}>
                    <Button onClick={() => fetchNextPage()} variant={'ghost'} colorScheme="purple">
                        See more
                    </Button>
                </ButtonGroup>
            ) : null}
        </Stack>
    )
}
