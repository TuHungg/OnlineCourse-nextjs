import ICourse from '../../shared/interfaces/models/course.interface'

export default interface IInstructorCourse extends ICourse {
    numStudentLoved: number
    numStudent: number
}
