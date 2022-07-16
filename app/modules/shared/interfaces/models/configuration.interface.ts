import IModel from './model.interface'

export interface ICourseConfiguration {
    priceTiers: number[]
}

export interface IMoneyConfiguration {
    instructorCommission: number
}

export default interface IConfiguration extends IModel {
    course: ICourseConfiguration
    money: IMoneyConfiguration
}
