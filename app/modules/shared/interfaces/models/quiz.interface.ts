import IModel from './model.interface';
import { IHistory } from './shared.interface';
export interface IAnswerOption {
    answerContent: string
    optionNo: number
    description?: string
}

export interface IQuestion {
    _id: string
    questionContent: string
    answerOptions?: IAnswerOption[]
    correctOptionNo: number
}

export default interface IQuiz extends IModel {
    title: string,
    description?: string,
    questions: IQuestion[]
    history: IHistory
}
