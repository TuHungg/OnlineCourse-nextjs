import { ITimestamp } from './shared.interface'
import { IMoneyConfiguration } from './configuration.interface'
import ICourse from './course.interface'
import IModel from './model.interface'
import IPayment from './payment.interface'
import { IUser } from './user.interface'

export interface ITransaction extends IModel {
    payment: IPayment
    customer: IUser
    course: ICourse
    salePrice: number
    moneyConfiguration: IMoneyConfiguration
    timestamps: ITimestamp
}
