import ICourse from './course.interface'
import IModel from './model.interface'
import { IHistory } from './shared.interface'
import { IUser } from './user.interface'

export interface IReviewResponse {
    user: IUser
    content: string
    timestamp: string
}

export default interface IReview extends IModel {
    rating: number
    content?: string
    user: IUser
    course: ICourse
    response?: IReviewResponse
    timestamps: IHistory
}
