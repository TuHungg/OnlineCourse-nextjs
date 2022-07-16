import React from 'react'
import BasicsForm from '../parts/BasicsForm'
import CoursePageSection from '../parts/CoursePageSection'

function Basics() {
    return (
        <CoursePageSection title={'Course landing page'} >
            <BasicsForm />
        </CoursePageSection>
    )
}

export default  React.memo(Basics)