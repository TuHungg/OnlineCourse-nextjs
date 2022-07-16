import { ITransaction } from './../../shared/interfaces/models/transaction.interface'
export default interface IPaymentTransaction extends ITransaction {
    salePrice: number
    commissionAmount: number
    earnings: number
}
