import { AspectRatio, Box, Heading, HStack, Image, Stack } from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../../../utils/helpers/path.helper'
import NextLink from '../../../../shared/components/NextLink'
import ICourse from '../../../../shared/interfaces/models/course.interface'
import AddToFavoriteButton from '../../../components/AddToFavoriteButton'
import CoursePrice from '../../../components/CourseGroup/CoursePrice'
import Rating from '../../../components/Rating'
import MyCourseCard from '../MyCourseCard'

export interface WishlistCourseExcerptProps {
    item: ICourse
}
function WishlistCourseExcerpt({ item }: WishlistCourseExcerptProps) {
    return (
        <MyCourseCard>
            <NextLink href={PathHelper.getLearnCoursePath(item.basicInfo.slug)}>
                <Stack shadow={'lg'} height="full">
                    {/* IMAGE */}
                    <AspectRatio ratio={16 / 9} pos="relative">
                        <Box>
                            <Image
                                src={item.basicInfo.image || ''}
                                alt={item.basicInfo.title}
                                w="full"
                            />
                        </Box>
                    </AspectRatio>
                    {/* INFO */}
                    <Stack p={[2, 4]} flex={1}>
                        {/* TITLE & SUBTITLE */}
                        <Stack spacing={1} minH="75px">
                            <Heading fontSize={'md'}>{item.basicInfo.title}</Heading>
                            {/* <Text color={subColor}>{item.course.basicInfo.subtitle}</Text> */}
                        </Stack>
                        <HStack justify={'space-between'}>
                            <Stack spacing={0}>
                                <Rating
                                    value={item.meta.avgRatingScore || 0}
                                    ratingCount={item.meta.ratingCount}
                                />
                                <CoursePrice
                                    currency={item.basicInfo.currency!}
                                    originPrice={item.basicInfo.price || 0}
                                    promotions={
                                        item.promotions?.enabled ? item.promotions : undefined
                                    }
                                ></CoursePrice>
                            </Stack>
                            <AddToFavoriteButton size="sm" item={item} />
                        </HStack>
                    </Stack>
                </Stack>
            </NextLink>
        </MyCourseCard>
    )
}

export default React.memo(WishlistCourseExcerpt)
