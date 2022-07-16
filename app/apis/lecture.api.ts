import { API_DOMAIN, CONTROLLER } from './../utils/constants/app.constant'
import ILecture from '../modules/shared/interfaces/models/lecture.interface'
import axios from 'axios'
import IFile from '../modules/shared/interfaces/models/file.interface'

const prefix = `${API_DOMAIN}/${CONTROLLER.lecture}`

export function apiUpdateLecture(id: string, data: Partial<ILecture>): Promise<ILecture> {
    return axios.patch(`${prefix}/${id}`, data).then((res) => res.data)
}

export function apiAddResource(id: string, data: Partial<IFile>): Promise<IFile> {
    return axios.patch(`${prefix}/add-resource/${id}`, data).then((res) => res.data)
}
export function apiAddResourceId(id: string, resourceId: string): Promise<void> {
    return axios.patch(`${prefix}/add-resource-id/${id}/${resourceId}`).then((res) => res.data)
}
export function apiRemoveResource(id: string, resourceId: string): Promise<void> {
    return axios.patch(`${prefix}/remove-resource/${id}/${resourceId}`).then((res) => res.data)
}
