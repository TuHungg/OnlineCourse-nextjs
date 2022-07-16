import { AspectRatio, Box, BoxProps, Image } from '@chakra-ui/react'
import React from 'react'
import AppImg from '../../../utils/constants/app-img.constant'

export interface CourseImageProps extends BoxProps {
    src?: string
    w?: string | number | object
    alt?: string
    defaultImage?: boolean
}
function CourseImage({
    w = '150px',
    alt = 'course image',
    src,
    defaultImage: defaultImage,
    ...props
}: CourseImageProps) {
    const placeholderSrc = defaultImage ? AppImg.MEDIA_PLACEHOLDER : ''
    return (
        <AspectRatio bgColor={'black'} minW={w} maxW={w} ratio={16 / 9} {...props}>
            {src || defaultImage ? <Image src={src || placeholderSrc} alt={alt} /> : <Box></Box>}
        </AspectRatio>
    )
}

export default React.memo(CourseImage)
