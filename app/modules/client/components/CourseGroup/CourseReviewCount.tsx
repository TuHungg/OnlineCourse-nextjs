import { Text } from '@chakra-ui/react'
import React from 'react'
import { useSubtitleColor } from '../../../shared/hooks/style.hook'
import { TSize } from '../../../shared/types/size.type'

export default function CourseReviewCount({
    children: value,
    size = 'xs',
}: {
    children?: number
    size?: TSize
}) {
    const subColor = useSubtitleColor()
    if (value == undefined) return <></>
    return (
        <Text fontSize={size} color={subColor}>
            ({value})
        </Text>
    )
}
