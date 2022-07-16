import React from 'react'
import ContentCard from '../../../components/ContentCard'
import MyContentList from '../../../components/MyContentList'
import { useCourseDetailRequirements } from '../../../queries/course-detail-query.hook'

function CourseRequirement() {
    const requirements = useCourseDetailRequirements()
    if (requirements?.length == 0) return <></>
    return (
        <ContentCard title={'Requirements'}>
            <MyContentList spacing={4} data={requirements || []} />
        </ContentCard>
    )
}

export default React.memo(CourseRequirement)
