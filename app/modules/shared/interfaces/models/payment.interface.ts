import IModel from './model.interface'
import { IHistory } from './shared.interface'
import { IUser } from './user.interface'

export type TPaymentStatus = 'pending' | 'paid'
export interface IPaymentHistory extends IHistory {
    paidAt?: string
}
export default interface IPayment extends IModel {
    status: TPaymentStatus
    user: IUser
    amount: number
    commissionAmount: number
    earnings: number
    history: IPaymentHistory
}
