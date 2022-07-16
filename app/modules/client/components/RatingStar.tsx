import { HStack, Icon } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'

export interface RatingStarProps {
    value: number
    w?: any
}
function RatingStar({ w = 20, ...props }: RatingStarProps) {
    const starsHtml = [...Array(Math.round(props.value))].map((_, i) => {
        return (
            <Icon
                key={i}
                fontSize={w + 'px'}
                as={AppIcon.rating}
                color="var(--chakra-colors-rating-500)"
            />
        )
    })
    return <HStack spacing={0}>{starsHtml}</HStack>
}

export default React.memo(RatingStar)
