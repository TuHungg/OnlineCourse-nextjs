import { ReactNode } from 'react'
import IModel from './models/model.interface'

export interface ITableRow extends IModel {
    [key: string | number]: string | number | boolean | ReactNode
}
