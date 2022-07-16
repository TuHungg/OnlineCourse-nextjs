import { HStack } from '@chakra-ui/react'
import React from 'react'
import CourseFormSidebarToggler from '../components/CourseFormSidebarToggler'
import CourseActions from '../components/CourseActions'

function MobileSubTopBar() {
    return (
        <HStack justify={'space-between'}>
            <CourseFormSidebarToggler />
            <CourseActions size="sm" />
        </HStack>
    )
}

export default React.memo(MobileSubTopBar)
