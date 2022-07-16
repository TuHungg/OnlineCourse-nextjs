import {
    AspectRatio,
    Heading,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import TypeHelper from '../../../../utils/helpers/type.helper'
import NextLink from '../../../shared/components/NextLink'
import { useSubtitleColor } from '../../../shared/hooks/style.hook'
import ICourse from '../../../shared/interfaces/models/course.interface'
import { useIsClientMobile } from '../../hooks/is-client-mobile.hook'
import Rating from '../Rating'
import BriefCourse from './BriefCourse'
import CoursePrice from './CoursePrice'

export interface HomeCourseExcerptProps {
    course: ICourse
}
function HomeCourseExcerpt({ course }: HomeCourseExcerptProps) {
    const subColor = useSubtitleColor()
    const isMobile = useIsClientMobile()
    const author = TypeHelper.isUser(course.history.createdBy)
        ? course.history.createdBy
        : undefined
    return (
        <>
            <Popover placement="right" boundary={'scrollParent'} trigger="hover">
                <NextLink href={PathHelper.getCourseDetailPath(course.basicInfo.slug)}>
                    <PopoverTrigger>
                        <Stack>
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={course.basicInfo.image || ''}
                                    alt={course.basicInfo.title}
                                />
                            </AspectRatio>
                            <Stack spacing={0}>
                                <Stack spacing={0} pt={{ base: 1, sm: 0 }}>
                                    <Heading fontSize={{ base: 'sm', md: 'md' }} noOfLines={3}>
                                        {course.basicInfo.title}
                                    </Heading>
                                    <Text fontSize={['xs', 'sm']} color={subColor}>
                                        {author?.profile.fullName}
                                    </Text>
                                </Stack>
                                <Stack spacing={0}>
                                    <Rating
                                        value={course.meta.avgRatingScore || 0}
                                        ratingCount={course.meta.ratingCount}
                                    />
                                    <CoursePrice
                                        currency={course.basicInfo.currency!}
                                        originPrice={course.basicInfo.price || 0}
                                        promotions={
                                            course.promotions?.enabled
                                                ? course.promotions
                                                : undefined
                                        }
                                    ></CoursePrice>
                                </Stack>
                            </Stack>
                        </Stack>
                    </PopoverTrigger>
                </NextLink>
                {!isMobile ? (
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody shadow="md" p={5}>
                            <BriefCourse course={course} />
                        </PopoverBody>
                    </PopoverContent>
                ) : null}
            </Popover>
        </>
    )
}

export default React.memo(HomeCourseExcerpt)
