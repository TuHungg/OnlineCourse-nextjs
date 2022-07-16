import { IMoneyConfiguration } from './configuration.interface'
import ICourse from './course.interface'
import IModel from './model.interface'
import { IHistory } from './shared.interface'

export interface ICourseInOrder {
    course: ICourse
    salePrice: number
    price: number
}

export default interface IOrder extends IModel {
    totalPrice: number
    coursesInOrder: ICourseInOrder[]
    moneyConfiguration: IMoneyConfiguration
    history: IHistory
}
