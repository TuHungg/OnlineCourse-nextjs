import { ButtonGroup, Button } from '@chakra-ui/react'
import React from 'react'
import { TColorScheme } from '../../types/color-scheme.type'

export interface InfiniteMoreButtonProps {
    colorScheme?: TColorScheme
    title?: string
    fetchNextPage: () => void
    hasNextPage?: boolean
}
export default function InfiniteMoreButton({
    title = 'See more',
    colorScheme = 'purple',
    ...props
}: InfiniteMoreButtonProps) {
    if (!props.hasNextPage) return <></>
    return (
        <ButtonGroup justifyContent={'center'}>
            <Button
                onClick={() => props.fetchNextPage()}
                variant={'ghost'}
                colorScheme={colorScheme}
            >
                {title}
            </Button>
        </ButtonGroup>
    )
}
