import { ICategory } from './../../modules/shared/interfaces/models/category.interface'
import IFile from '../../modules/shared/interfaces/models/file.interface'
import ILecture from '../../modules/shared/interfaces/models/lecture.interface'
import IQuiz from '../../modules/shared/interfaces/models/quiz.interface'
import { IUser } from '../../modules/shared/interfaces/models/user.interface'
import IRole from '../../modules/shared/interfaces/models/role.interface'

export default class TypeHelper {
    static isFile(item: IFile | string | undefined): item is IFile {
        if (item) return typeof item != 'string'
        return false
    }
    static isLecture(item: ILecture | string | undefined): item is ILecture {
        if (item) return typeof item != 'string'
        return false
    }
    static isUser(item: IUser | string | undefined): item is IUser {
        if (item) return typeof item != 'string'
        return false
    }
    static isQuiz(item: IQuiz | string | undefined): item is IQuiz {
        if (item) return typeof item != 'string'
        return false
    }
    static isCategory(item: ICategory | string | undefined | null): item is ICategory {
        if (item) return typeof item != 'string'
        return false
    }
    static isRole(item: IRole | string | undefined | null): item is IRole {
        if (item) return typeof item != 'string'
        return false
    }
}
