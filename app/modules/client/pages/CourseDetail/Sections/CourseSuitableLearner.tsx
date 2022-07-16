import { Text } from '@chakra-ui/react'
import React from 'react'
import ContentCard from '../../../components/ContentCard'
import MyContentList from '../../../components/MyContentList'
import { useCourseDetailSuitableLearners } from '../../../queries/course-detail-query.hook'

function CourseSuitableLearner() {
    const suitableLearners = useCourseDetailSuitableLearners()
    if (suitableLearners?.length == 0) return <></>
    return (
        <ContentCard title="Who this course is for:">
            <MyContentList data={suitableLearners || []} />
        </ContentCard>
    )
}

export default React.memo(CourseSuitableLearner)
