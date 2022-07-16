import { StarIcon } from '@chakra-ui/icons'
import { Text, HStack, Icon } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'
import { TSize } from '../../shared/types/size.type'
import CourseReviewCount from './CourseGroup/CourseReviewCount'
import RatingStar from './RatingStar'

export interface RatingProps {
    value?: number
    ratingCount?: number
    showLabel?: boolean
    fw?: boolean
    size?: 'md' | 'sm'
}
function Rating({
    value = 0,
    ratingCount,
    fw = false,
    showLabel = true,
    size = 'md',
    ...props
}: RatingProps) {
    const val = Number.parseFloat(value.toFixed(1))
    const starWidth = size == 'md' ? 20 : 10
    return (
        <HStack spacing={1}>
            {showLabel && (
                <Text fontSize={size} fontWeight={'bold'} color="yellow.600">
                    {val}
                </Text>
            )}
            <HStack spacing={0.5} minW={fw ? '90px' : undefined}>
                <RatingStar value={val} w={starWidth + 'px'} />
            </HStack>
            {ratingCount != undefined && <CourseReviewCount>{ratingCount}</CourseReviewCount>}
        </HStack>
    )
}

export default React.memo(Rating)
