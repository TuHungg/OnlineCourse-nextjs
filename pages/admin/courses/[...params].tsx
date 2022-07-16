import CourseForm from '../../../app/modules/admin/pages/courses/CourseForm'
import CourseFormLayout from '../../../app/modules/course-form/CourseFormLayout'
import { NextPageWithLayout } from '../../../app/types/next'

const Form: NextPageWithLayout = () => {
    return <CourseForm />
}

Form.getLayout = CourseFormLayout
export default Form
