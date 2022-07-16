import React from 'react'
import CoursePageSection from '../parts/CoursePageSection'
import ObjectiveForm from '../parts/ObjectiveForm'
import RequirementForm from '../parts/RequirementForm'
import SuitableLearnerForm from '../parts/SuitableLearnerForm'

function IntendedLearners() {
    return (
        <CoursePageSection title={'Intended learners'} >
            <ObjectiveForm />
            <RequirementForm />
            <SuitableLearnerForm />
        </CoursePageSection>
    )
}

export default  React.memo(IntendedLearners);