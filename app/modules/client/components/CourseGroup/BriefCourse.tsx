import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Objective } from '../../pages/CourseDetail/Sections/CourseObjective'
import AddToCartButton from '../AddToCartButton'
import AddToFavoriteButton from '../AddToFavoriteButton'
import { HomeCourseExcerptProps } from './HomeCourseExcerpt'

const BriefCourse = ({ course }: HomeCourseExcerptProps) => {
    const objectivesHtml = course.details.objectives?.slice(0, 1).map((content, i) => {
        return (
            <Objective alignItems={'center'} spacing={2} key={i}>
                <Text as="span" noOfLines={2}>
                    {content}
                </Text>
            </Objective>
        )
    })
    return (
        <Stack>
            <Heading fontSize={'lg'}>{course.basicInfo.title}</Heading>
            <Stack>
                <Text noOfLines={2} fontSize="sm">
                    {course.basicInfo.subtitle}
                </Text>
                <Stack>{objectivesHtml}</Stack>
                <HStack>
                    <Box flex={1}>
                        <AddToCartButton course={course} />
                    </Box>
                    <AddToFavoriteButton item={course} />
                </HStack>
            </Stack>
        </Stack>
    )
}

export default React.memo(BriefCourse)
