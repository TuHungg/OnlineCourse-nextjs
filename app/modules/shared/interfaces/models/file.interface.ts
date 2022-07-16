import { TStatus } from '../../../admin/components/StatusBadge';
import IModel from './model.interface';
import { IHistory } from './shared.interface';
export default interface IFile extends IModel {
    url: string
    name: string
    status: TStatus
    size: number
    type: string
    duration?: number
    thumbnailUrl?: string
    history: IHistory
}