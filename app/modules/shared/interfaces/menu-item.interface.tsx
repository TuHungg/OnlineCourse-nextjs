import { IMyDropDownItem } from './dropdown-item.interface'
import IModel from './models/model.interface'

export interface IMenuItem<T extends IModel> extends IMyDropDownItem {
    onItemClick?: (item: T) => void
}
