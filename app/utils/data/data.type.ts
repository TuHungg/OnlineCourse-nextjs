import { TCategoryStatus } from '../../modules/shared/interfaces/models/category.interface'
import { TCourseStatus } from '../../modules/shared/interfaces/models/course.interface'
import { TSliderStatus } from '../../modules/shared/interfaces/models/slider.interface'
import { TUserStatus } from '../../modules/shared/interfaces/models/user.interface'
import { ISelectItem } from '../../modules/shared/interfaces/select-data.interface'
export type TOtherController = 'document-permission'

export type TController =
    | 'notifications'
    | 'users'
    | 'roles'
    | 'courses'
    | 'lectures'
    | 'quizzes'
    | 'files'
    | 'categories'
    | 'usercourses'
    | 'auth'
    | 'comments'
    | 'reviews'
    | 'orders'
    | 'payments'
    | 'sliders'
    | 'activity-logs'
export type TModel =
    | 'notification'
    | 'order'
    | 'user'
    | 'role'
    | 'course'
    | 'lecture'
    | 'quiz'
    | 'file'
    | 'category'
    | 'user-course'
    | 'auth'
    | 'comment'
    | 'review'
    | 'payment'
    | 'slider'
    | 'activity log'

//
export type TRoleStatus = 'active' | 'inactive'
export type TRoleSelectItem = ISelectItem<string> & { value: TRoleStatus }
//
export type TUserSelectItem = ISelectItem<string> & { value: TUserStatus }
//
export type TSliderSelectItem = ISelectItem<string> & { value: TSliderStatus }
//
export type TCategorySelectItem = ISelectItem<string> & { value: TCategoryStatus }
//
export type TCourseSelectItem = ISelectItem<string> & { value: TCourseStatus }
