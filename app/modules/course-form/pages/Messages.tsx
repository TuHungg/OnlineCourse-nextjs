import React from 'react'
import BasicsForm from '../parts/BasicsForm'
import CoursePageSection from '../parts/CoursePageSection'
import MessageForm from '../parts/MessageForm'

function Messages() {
    return (
        <CoursePageSection title={'Course messages'} >
            <MessageForm />
        </CoursePageSection>
    )
}

export default  React.memo(Messages);