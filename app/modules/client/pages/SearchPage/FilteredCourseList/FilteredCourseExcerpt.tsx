import {
    Box,
    Heading,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../../../utils/helpers/path.helper'
import Time from '../../../../admin/components/Time'
import CourseImage from '../../../../shared/components/CourseImage'
import NextLink from '../../../../shared/components/NextLink'
import { useSubtitleColor } from '../../../../shared/hooks/style.hook'
import ICourse from '../../../../shared/interfaces/models/course.interface'
import CoursePrice from '../../../components/CourseGroup/CoursePrice'
import BriefCourse from '../../../components/CourseGroup/BriefCourse'
import Rating from '../../../components/Rating'
import { useIsClientMobile } from '../../../hooks/is-client-mobile.hook'

export const CourseExcerptMeta = ({ course }: { course: ICourse }) => {
    const subColor = useSubtitleColor()
    const hour = course.meta.contentVideoLength
        ? Math.round(course.meta.contentVideoLength / 60 / 60)
        : 0
    return (
        <HStack mb={'0.4rem'} spacing={1} color={subColor}>
            <Text fontSize={'xs'}>{hour} total hours •</Text>
            <Text fontSize={'xs'}>{course.basicInfo.level || 'All Levels'}</Text>
        </HStack>
    )
}

function FilteredCourseExcerpt({ course }: { course: ICourse }) {
    const isMobile = useIsClientMobile()
    const subColor = useSubtitleColor()
    const showOriginPrice = useBreakpointValue([false, false, true])
    return (
        <Popover placement="bottom" boundary={'scrollParent'} trigger="hover">
            <NextLink href={PathHelper.getCourseDetailPath(course.basicInfo.slug)}>
                <PopoverTrigger>
                    <HStack align="start">
                        <CourseImage
                            src={course.basicInfo.image || ''}
                            w={{ base: '100px', sm: '150px', md: '250px' }}
                        />
                        <Stack flex={1} spacing={0} pl={{ md: 4 }}>
                            {/* TITLE & SUBTITLE */}
                            <Box>
                                <Heading noOfLines={2} fontSize={'sm'}>
                                    {' '}
                                    {course.basicInfo.title}{' '}
                                </Heading>
                                <Text
                                    noOfLines={2}
                                    fontSize="sm"
                                    display={{ base: 'none', md: 'unset' }}
                                >
                                    {course.basicInfo.subtitle}
                                </Text>
                            </Box>
                            {/* CREATED BY */}
                            <Text fontSize={'xs'} color={subColor}>
                                Peter Anh
                            </Text>
                            {/* META */}
                            <Stack spacing={0}>
                                <Stack spacing={0}>
                                    <Rating
                                        size="sm"
                                        ratingCount={course.meta.ratingCount}
                                        value={course.meta.avgRatingScore || 0}
                                    />
                                    <CourseExcerptMeta course={course} />
                                    <Text
                                        as="div"
                                        color={subColor}
                                        fontSize={'xs'}
                                        display={['none', 'unset']}
                                    >
                                        <Time
                                            showIcon={false}
                                            type="short"
                                            timestamp={course.history.createdAt}
                                        />
                                    </Text>
                                </Stack>
                                <Box display={{ base: 'block', md: 'none' }}>
                                    <CoursePrice
                                        currency={course.basicInfo.currency!}
                                        originPrice={course.basicInfo.price || 0}
                                        promotions={course.promotions}
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Box
                            display={{ base: 'none', md: 'block' }}
                            alignSelf={'start'}
                            fontSize={'lg'}
                            ml={4}
                        >
                            <CoursePrice
                                currency={course.basicInfo.currency!}
                                originPrice={course.basicInfo.price || 0}
                                promotions={course.promotions}
                                showOriginPrice={showOriginPrice}
                            />
                        </Box>
                    </HStack>
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
    )
}
export default React.memo(FilteredCourseExcerpt)
