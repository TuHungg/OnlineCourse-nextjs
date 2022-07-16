import ICourse from './course.interface'
import IModel from './model.interface'
import IRole from './role.interface'

export interface IProfile {
    lastName: string
    firstName: string
    avatar?: string | null
    phone?: string
    address?: string
    fullName: string
}

export interface ICourseList {
    name: string
    Course: ICourse[]
}

export type TMyCourse = 'learning' | 'wishlist' | 'archived'
export interface IMyCourses {
    learning: ICourse[] | string[]
    wishlist: ICourse[] | string[]
    archived: ICourse[]
    lists: ICourseList[]
}

export interface ICart {
    courses: ICourse[]
}

export type TUserStatus = 'active' | 'inactive' | 'block' | 'unverified'
export interface IUser extends IModel {
    email: string
    status: TUserStatus
    password: string
    profile: IProfile
    role: IRole
    providers: string[]
    myCourses: IMyCourses
    cart: ICart
    createdAt: string
    lastLoggon?: string
    modifiedAt?: string
}
