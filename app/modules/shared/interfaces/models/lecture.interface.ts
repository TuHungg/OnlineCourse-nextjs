import { IHistory } from './shared.interface';
import IModel from "./model.interface";
import IFile from './file.interface';

export default interface ILecture extends IModel {
    title: string
    description?: string
    video?: IFile | string
    thumbnail?: IFile | string
    resources: IFile[] | string[]
    comments?: Comment[]
    history: IHistory
}
