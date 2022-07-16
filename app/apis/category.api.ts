import { ISecondLevelCatInfo } from '../modules/client/providers/client-menu.provider'
import { ISelectItem } from '../modules/shared/interfaces/select-data.interface'
import { CONTROLLER } from '../utils/constants/app.constant'
import { axiosApiInstance } from './../utils/axios-utils'

const prefix = `${CONTROLLER.category}`

export function fetchPrimarySelectData(): Promise<ISelectItem<string>[]> {
    return axiosApiInstance.get(`${prefix}/primary-select-data`).then((res) => res.data)
}

export function fetchSubSelectData(parentId: string): Promise<ISelectItem<string>[]> {
    return axiosApiInstance.get(`${prefix}/sub-select-data/${parentId}`).then((res) => res.data)
}

export function fetchCatsMenu(): Promise<ISecondLevelCatInfo[]> {
    return axiosApiInstance.get(`${prefix}/menu-data`).then((res) => res.data)
}
