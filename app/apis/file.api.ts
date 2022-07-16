import IFile from '../modules/shared/interfaces/models/file.interface'
import { API_DOMAIN, CONTROLLER } from '../utils/constants/app.constant'
import UrlHelper from '../utils/helpers/url.heper'
import { TFileType } from '../modules/course-form/hooks/my-files-query.hook'
import { axiosApiInstance } from './../utils/axios-utils'

const prefix = `${API_DOMAIN}/${CONTROLLER.file}`

export function apiCreateFile(data: Partial<IFile>): Promise<IFile> {
    return axiosApiInstance.post(`${prefix}`, data).then((res) => res.data)
}

export interface IFileQuery {
    search: string
    fileType: TFileType
}
export function fetchMyFiles({ queryKey }: any): Promise<IFile[]> {
    const [_key, fileQuery, _page, _limit]: [string, IFileQuery, number, number] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString({
        ...fileQuery,
        _page,
        _limit,
    })
    return axiosApiInstance.get(`${prefix}/my-files?${queryString}`).then((res) => res.data)
}

export function countMyFiles({ queryKey }: any): Promise<number> {
    const [_key, fileQuery]: [string, IFileQuery] = queryKey
    const queryString = UrlHelper.cvtObjToQueryString(fileQuery)
    return axiosApiInstance.get(`${prefix}/count-my-files?${queryString}`).then((res) => res.data)
}
