import React from 'react'
import ContentCard from '../../../components/ContentCard'
import { useCourseDetailDescription } from '../../../queries/course-detail-query.hook'

function CourseDescription() {
    const description = useCourseDetailDescription()
    if (!description) return <></>
    return (
        <ContentCard title="Description" border="none">
            <div dangerouslySetInnerHTML={{ __html: description || '' }}></div>
        </ContentCard>
    )
}

export default React.memo(CourseDescription)
