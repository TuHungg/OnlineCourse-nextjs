import { IUser } from '../../shared/interfaces/models/user.interface'

export default interface IInstructorWithStat extends IUser {
    meta: {
        totalCourse: number
        totalRevenue: number
        totalEnrollment: number
        courseRating: number
    }
}
