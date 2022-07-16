import { IUser } from './../../shared/interfaces/models/user.interface'
export default interface IInstructorWithPayment extends IUser {
    pendingAmount: number
    numPending: number
    firstPendingCreatedAt?: string
}
