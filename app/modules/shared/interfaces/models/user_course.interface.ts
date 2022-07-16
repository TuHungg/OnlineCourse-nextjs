import ICourse from './course.interface'
import ILecture from './lecture.interface'
import IModel from './model.interface'
import IQuiz from './quiz.interface'
import { ITimestamp } from './shared.interface'
import { IUser } from './user.interface'

export interface IArchived {
    isArchived: boolean
    timestamp?: string
}

export interface IQuestionAnswer {
    question: string
    answerNo: number
}

export type TLearnQuizStatus = 'done' | 'doing' | 'idle'
export interface ILearnQuiz {
    quiz?: IQuiz
    questionAnswers: IQuestionAnswer[]
    skipQuestions: string[]
    currentQuestionIdx: number
    status: TLearnQuizStatus
}

export interface ILearnLecture {
    lecture: ILecture
    videoTimeStamp: number
}

export interface ILearnUnit extends IModel {
    unitId: string
    learnQuiz?: ILearnQuiz
    learnLecture?: ILearnLecture
    isCompleted: boolean
}

export interface ILearnDetail {
    learnUnits: ILearnUnit[]
    activeContentIds: [string, string]
    progress: number
}

export interface IUserCourse extends IModel {
    salePrice: number
    course: ICourse
    user: IUser | string
    learnDetail: ILearnDetail
    activeContentIds: [string, string]
    timestamps: ITimestamp
    archived: IArchived
}
