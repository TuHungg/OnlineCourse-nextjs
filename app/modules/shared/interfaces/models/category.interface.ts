import { IHistory } from './shared.interface'
import IModel from './model.interface'

export type TCategoryStatus = 'active' | 'inactive'
export interface ICategory extends IModel {
    name: string
    slug: string
    parent: ICategory | null | string
    status: TCategoryStatus
    history: IHistory
}
