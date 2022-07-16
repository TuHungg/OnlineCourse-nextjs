import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import ICourse from '../../../shared/interfaces/models/course.interface'
import CourseGroupSkeleton from './CourseGroupSkeleton'
import CourseList from './CourseList'

export interface CourseGroupProps {
    isLoading: boolean
    title: string
    courses: ICourse[]
}
export default function CourseGroup(props: CourseGroupProps) {
    return (
        <Stack spacing={[2, 2, 4]}>
            <Box>
                <Heading fontSize={['xl', '2xl', '3xl', '4xl']}>{props.title}</Heading>
            </Box>
            {props.isLoading ? <CourseGroupSkeleton /> : <CourseList courses={props.courses} />}
        </Stack>
    )
}
