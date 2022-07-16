import IModel from './model.interface'
import { IUser } from './user.interface'

export type TNotificationSourceType =
    | 'course-approval'
    | 'new-comment'
    | 'payment-paid'
    | 'new-enrollment'
    | 'new-activity'
    | 'message'
export default interface INotification extends IModel {
    sourceId?: string
    contextId?: string
    sourceSlug?: string
    sourceType: TNotificationSourceType
    receiver: IUser
    content: string
    thumb?: string
    isRead: boolean
    isNew: boolean
    createdAt: string
}
