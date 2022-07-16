import { Box, HStack, Skeleton } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveUnit } from '../../../../store/course/learn-course.slice'
import { useSidebar } from '../../../shared/providers/sidebar.provider'
import ContentSkeleton from '../../components/ContentSkeleton'
import LectureContent from './LectureContent/LectureContent'
import QuizContent from './QuizContent/QuizContent'
import ShowSidebarButton from './ShowSidebarButton'

export default function ContentBox() {
    const { isOpen } = useSidebar()
    const unit = useSelector(selectActiveUnit)
    const renderContent = useMemo(() => {
        switch (unit?.type) {
            case 'lecture':
                return <LectureContent />
            case 'quiz':
                return <QuizContent />
            default:
                return <ContentSkeleton />
        }
    }, [unit?.type])
    return (
        <Box overflowX={'hidden'}>
            <Box>{renderContent}</Box>
            {!isOpen && <ShowSidebarButton />}
        </Box>
    )
}
