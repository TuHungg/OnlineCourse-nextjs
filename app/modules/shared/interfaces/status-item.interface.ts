import { TColorScheme } from '../types/color-scheme.type'
import { ISelectItem } from './select-data.interface'

export interface IStatusItem extends ISelectItem<string> {
    color: TColorScheme
}
