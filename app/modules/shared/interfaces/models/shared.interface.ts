import { IUser } from './user.interface'
export interface IHistory {
    createdBy: IUser
    createdAt: string
    updatedBy?: IUser | string
    updatedAt?: string
}
export interface ITimestamp {
    createdAt: string
    updatedAt?: string
}
