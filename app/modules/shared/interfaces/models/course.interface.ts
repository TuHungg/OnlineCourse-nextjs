import { ICategory } from './category.interface'
import ILecture from './lecture.interface'
import IModel from './model.interface'
import IQuiz from './quiz.interface'
import { IHistory } from './shared.interface'

export type TCourseCurrency = 'vnd' | 'usd'
export type TCourseLevel = 'beginner' | 'intermediate' | 'expert' | 'all'
export interface ICourseBasicInfo {
    title: string
    slug: string
    subtitle?: string
    price: number
    lan?: string
    level?: TCourseLevel
    currency: TCourseCurrency
    isFree?: boolean
    image?: string | null
}

export type TUnitType = 'lecture' | 'quiz'
export interface ICourseUnit {
    _id: string
    lecture?: string | ILecture
    quiz?: IQuiz
    type: TUnitType
}

export interface ICourseSection {
    _id: string
    title?: string
    objective?: string
    numLectures?: number
    length?: number
    units: ICourseUnit[]
}

interface ICourseDetails {
    requirements?: string[]
    objectives?: string[]
    sections?: ICourseSection[]
    description?: string
    suitableLearner?: string[]
}

export interface ICourseMeta {
    studentCount?: number
    avgRatingScore?: number
    ratingCount?: number
    contentVideoLength?: number
}

interface ICourseMessages {
    welcome?: string
    congratulations?: string
}

export interface ICoursePromotions {
    enabled: boolean
    discountPrice?: number
    startAt?: string
    endAt?: string
}

export interface ICourseHistory extends IHistory {
    publishedAt?: string
}

export type TCourseStatus = 'active' | 'draft' | 'pending' | 'rejected'
export default interface ICourse extends IModel {
    status?: TCourseStatus
    categories?: string[] | ICategory[]
    topics?: string[]
    basicInfo: ICourseBasicInfo
    details: ICourseDetails
    meta: ICourseMeta
    messages: ICourseMessages
    promotions: ICoursePromotions
    history: ICourseHistory
}
