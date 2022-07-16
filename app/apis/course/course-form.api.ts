import { TDragUnit } from '../../modules/course-form/hooks/unit-sortable.hook'
import ICourse, {
    ICourseSection,
    ICourseUnit,
} from '../../modules/shared/interfaces/models/course.interface'
import IFile from '../../modules/shared/interfaces/models/file.interface'
import ILecture from '../../modules/shared/interfaces/models/lecture.interface'
import { ISwapByIds } from '../../modules/shared/interfaces/swap.inteface'
import { IUnitSwapByIds } from '../../modules/shared/interfaces/unit-swap.interface'
import { CONTROLLER } from '../../utils/constants/app.constant'
import { axiosApiInstance } from './../../utils/axios-utils'

const prefix = `${CONTROLLER.course}/curriculum`

export function apiSwapCourseSection(id: string, data: ISwapByIds): Promise<ICourse> {
    return axiosApiInstance.patch(`${prefix}/swap-section/${id}`, data).then((res) => res.data)
}

export function apiSwapCourseUnit(id: string, data: IUnitSwapByIds): Promise<ICourse> {
    return axiosApiInstance.patch(`${prefix}/swap-unit/${id}`, data).then((res) => res.data)
}

export type TAddCourseSection = {
    sectionIndex: number
    data: Partial<ICourseSection>
}
export function apiAddCourseSection(id: string, data: TAddCourseSection): Promise<ICourseSection> {
    return axiosApiInstance.patch(`${prefix}/add-section/${id}`, data).then((res) => res.data)
}
export type TAddCourseUnit = {
    sectionId: string
    unitIndex: number
    unit: Partial<ICourseUnit>
}
export function apiAddCourseUnit(id: string, data: TAddCourseUnit): Promise<ICourseUnit> {
    return axiosApiInstance.patch(`${prefix}/add-unit/${id}`, data).then((res) => res.data)
}
export type TUpdateCourseSection = {
    sectionId: string
    data: Partial<ICourseSection>
}
export function apiUpdateCourseSection(id: string, data: TUpdateCourseSection): Promise<ICourse> {
    return axiosApiInstance.patch(`${prefix}/update-section/${id}`, data).then((res) => res.data)
}

export type TDeleteCourseSection = {
    sectionId: string
}
export function apiDeleteCourseSection(id: string, data: TDeleteCourseSection): Promise<ICourse> {
    return axiosApiInstance.patch(`${prefix}/delete-section/${id}`, data).then((res) => res.data)
}

export type TUnitAccess = {
    sectionIndex: number
    unitId: string
}
export function apiDeleteCourseUnit(id: string, data: TUnitAccess): Promise<ICourse> {
    return axiosApiInstance.patch(`${prefix}/delete-unit/${id}`, data).then((res) => res.data)
}

export type TMoveCourseUnitToSection = {
    sectionId: string
    unitAddress: TDragUnit
}
export function apiMoveCourseUnitToSection(
    id: string,
    data: TMoveCourseUnitToSection
): Promise<ICourse> {
    return axiosApiInstance
        .patch(`${prefix}/move-unit-to-section/${id}`, data)
        .then((res) => res.data)
}

export function apiUpdateLectureVideo(id: string, data: Partial<IFile>): Promise<IFile> {
    return axiosApiInstance
        .patch(`${prefix}/update-lecture-video/${id}`, data)
        .then((res) => res.data)
}
export function apiUpdateLectureVideoFromLibrary(id: string, fileId: string): Promise<IFile> {
    return axiosApiInstance
        .patch(`${prefix}/update-lecture-video-from-library/${id}/${fileId}`)
        .then((res) => res.data)
}
