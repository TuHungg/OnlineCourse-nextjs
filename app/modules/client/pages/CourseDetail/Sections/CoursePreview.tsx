import { Box, HStack, LightMode, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import CourseImage from '../../../../shared/components/CourseImage'
import { useTop } from '../../../../shared/hooks/on-top-hook'
import { useBorderColor } from '../../../../shared/hooks/style.hook'
import { useShowPreviewCourse } from '../../../hooks/show-preview-course.hook'
import { useCourseDetailQuery } from '../../../queries/course-detail-query.hook'
import CourseCheckout from './CourseCheckout'

const CoursePreview = () => {
    const { data: course } = useCourseDetailQuery()
    const isTop = useTop()
    const borderColor = useBorderColor()
    const bgColor = useColorModeValue('white', 'blackAlpha.500')
    const show = useShowPreviewCourse()
    if (!show) return <></>
    //
    if (!course) return <></>
    return (
        <LightMode>
            <Stack
                w="340px"
                pos="fixed"
                minH={'500px'}
                transitionProperty={'top'}
                transitionDuration={'normal'}
                top={isTop ? '100px' : '50px'}
                right="150px"
                overflowY="auto"
                flexDir="column"
                display={{ base: 'none', xl: 'flex' }}
                shadow="2xl"
                border="2px solid"
                bgColor={bgColor}
                borderColor={borderColor}
            >
                <HStack justify={'center'} bg="blackAlpha.900">
                    <CourseImage w="full" src={course.basicInfo.image || ''} />
                </HStack>
                <Box px={8}>
                    <CourseCheckout course={course} size="sm" />
                </Box>
            </Stack>
        </LightMode>
    )
}

export default React.memo(CoursePreview)
