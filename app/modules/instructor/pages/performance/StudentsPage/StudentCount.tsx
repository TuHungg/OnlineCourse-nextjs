import { Text, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import InstructorFeatureNumber from '../../../components/InstructorCount'
import { useCountStudentsQuery } from '../../../queries/students-query.hook'

export const StudentCount = () => {
    const { isLoading, data } = useCountStudentsQuery()
    if (isLoading) return <></>
    return <InstructorFeatureNumber value={data || 0} label="students" />
}
