import { Skeleton, SkeletonProps, Stack } from '@chakra-ui/react'
import React, { useCallback } from 'react'

export interface MySkeletonProps extends SkeletonProps {
    height?: string | number
    noOfLines?: number
    spacing?: number
}

export default function MySkeletons({
    height = '20px',
    spacing = 2,
    noOfLines = 1,
    ...props
}: MySkeletonProps) {
    const renderSkeleton = useCallback(
        (_: any, i: number) => {
            return <Skeleton key={i} height={height} {...props} />
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [props]
    )
    return <Stack spacing={spacing}>{[...Array(noOfLines)].map(renderSkeleton)}</Stack>
}
