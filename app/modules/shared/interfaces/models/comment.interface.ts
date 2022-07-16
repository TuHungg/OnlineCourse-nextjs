import { ITimestamp } from './shared.interface'
import { IUser } from './user.interface'
import IModel from './model.interface'
import ICourse, { ICourseUnit } from './course.interface'

export default interface IComment extends IModel {
    unit: ICourseUnit
    course: ICourse
    parent: IComment | null
    content: string
    user: IUser
    timestamps: ITimestamp
    hasSub?: boolean
}
