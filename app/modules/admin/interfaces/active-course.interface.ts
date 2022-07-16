import ICourse from '../../shared/interfaces/models/course.interface'

export default interface IActiveCourse extends ICourse {
    numStudent: number
    totalSales: number
}
