import ISlider from '../modules/shared/interfaces/models/slider.interface'
import { axiosApiInstance } from '../utils/axios-utils'
import { CONTROLLER } from '../utils/constants/app.constant'

const prefix = `${CONTROLLER.slider}`

export function fetchHomeSliders({ queryKey, pageParam = 1 }: any): Promise<ISlider[]> {
    const [_key, limit] = queryKey
    return axiosApiInstance
        .get(`${prefix}/home?_page=${pageParam}&_limit=${limit}`)
        .then((res) => res.data)
}

export function countHomeSliders(): Promise<number> {
    return axiosApiInstance.get(`${prefix}/count-home`).then((res) => res.data)
}
