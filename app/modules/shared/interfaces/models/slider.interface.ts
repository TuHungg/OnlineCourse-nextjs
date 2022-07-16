import IModel from './model.interface'
import { IHistory } from './shared.interface'

export type TSliderStatus = 'active' | 'inactive'
export default interface ISlider extends IModel {
    name: string
    status: TSliderStatus
    description?: string
    picture?: string | null
    history: IHistory
}
