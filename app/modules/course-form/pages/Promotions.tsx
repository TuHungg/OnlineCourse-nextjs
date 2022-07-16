import React from 'react'
import BasicsForm from '../parts/BasicsForm'
import CoursePageSection from '../parts/CoursePageSection'
import MessageForm from '../parts/MessageForm'
import PromotionForm from '../parts/PromotionForm'

function Promotions() {
    return (
        <CoursePageSection title={'Promotions'} >
            <PromotionForm />
        </CoursePageSection>
    )
}

export default React.memo(Promotions);