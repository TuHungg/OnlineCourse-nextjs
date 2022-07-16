import { Heading } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    selectLearnCourseSlug,
    selectLearnTitle,
} from '../../../../store/course/learn-course.slice'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'

export default function LearnCourseTitle() {
    const title = useSelector(selectLearnTitle)
    const slug = useSelector(selectLearnCourseSlug)
    return (
        <NextLink href={PathHelper.getCourseDetailPath(slug!)}>
            <Heading noOfLines={1} fontWeight={'light'} fontSize={['md', 'lg']}>
                {title}
            </Heading>
        </NextLink>
    )
}
