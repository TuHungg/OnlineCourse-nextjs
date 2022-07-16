import { Box, Container, Heading, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import NumberFormat from 'react-number-format'
import CourseImage from '../../../../shared/components/CourseImage'
import Rating from '../../../components/Rating'
import { useShowPreviewCourse } from '../../../hooks/show-preview-course.hook'
import { useCourseDetailQuery } from '../../../queries/course-detail-query.hook'
import CourseCheckout from './CourseCheckout'

const Meta = () => {
    const course = useCourseDetailQuery().data
    const show = useShowPreviewCourse()
    return (
        <Stack
            color={show ? 'whitesmoke' : 'unset'}
            fontSize={['sm', 'unset']}
            flexDir={{
                base: 'column',
                sm: 'row',
            }}
            spacing={{
                sm: 0,
            }}
            gap={{
                sm: 2,
            }}
        >
            <Rating value={course?.meta.avgRatingScore} ratingCount={course?.meta.ratingCount} />
            <Box>
                <Text>
                    (
                    <NumberFormat
                        displayType="text"
                        thousandSeparator
                        value={course?.meta.ratingCount}
                    />
                    &nbsp;ratings)
                </Text>
            </Box>
            <Box>
                <Text>
                    <NumberFormat
                        value={course?.meta.studentCount}
                        displayType="text"
                        thousandSeparator
                    />
                    &nbsp;students
                </Text>
            </Box>
        </Stack>
    )
}

const History = () => {
    const course = useCourseDetailQuery().data
    const show = useShowPreviewCourse()
    return (
        <Stack fontSize={['sm', 'unset']} spacing={0}>
            <HStack>
                <Text color={show ? 'white' : 'unset'}>Create by</Text>
                <Text color="pink.400" as="ins">
                    {course?.history.createdBy.profile.fullName}
                </Text>
            </HStack>
            <HStack>
                <HStack>
                    {course?.history.publishedAt && (
                        <Text color={show ? 'white' : 'unset'}>
                            Last updated{' '}
                            {moment(new Date(course.history.publishedAt)).format('MM/YYYY')}
                        </Text>
                    )}
                </HStack>
            </HStack>
        </Stack>
    )
}

const CourseIntro = () => {
    const { data: course } = useCourseDetailQuery()
    const showPreviewCourse = useShowPreviewCourse()
    const bg = useColorModeValue('blackAlpha.900', 'blackAlpha.500')
    if (!course) return <></>
    return (
        <Stack spacing={2} bg={showPreviewCourse ? bg : 'unset'}>
            <Container maxW="container.lg">
                <Box maxW="700px" margin={showPreviewCourse ? 'unset' : 'auto'}>
                    <Stack spacing={4} py={4}>
                        <Box display={showPreviewCourse ? 'none' : 'block'}>
                            <CourseImage src={course?.basicInfo.image || ''} w="full" />
                        </Box>
                        {/* TITLE AND SUBTITLE */}
                        <Box>
                            <Heading
                                fontSize={['xl', '2xl', '3xl']}
                                color={showPreviewCourse ? 'white' : 'unset'}
                                mb={2}
                                size="lg"
                            >
                                {course?.basicInfo.title}{' '}
                            </Heading>

                            <Text color={showPreviewCourse ? 'white' : 'unset'} fontSize="md">
                                {course?.basicInfo.subtitle}
                            </Text>
                        </Box>

                        <Stack
                            spacing={{
                                base: 0,
                                sm: 'unset',
                            }}
                            flexDir={{
                                base: 'row',
                                sm: 'column',
                            }}
                            justify={{
                                base: 'start',
                                sm: 'unset',
                            }}
                            gap={{ base: 10, sm: 0 }}
                        >
                            {/* META */}
                            <Meta />

                            {/* HISTORY */}
                            <History />
                        </Stack>
                        {!showPreviewCourse ? <CourseCheckout course={course} /> : null}
                    </Stack>
                </Box>
            </Container>
        </Stack>
    )
}

export default React.memo(CourseIntro)
