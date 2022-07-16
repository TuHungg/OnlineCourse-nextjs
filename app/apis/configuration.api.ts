import IConfiguration from '../modules/shared/interfaces/models/configuration.interface'
import { axiosApiInstance } from '../utils/axios-utils'

const prefix = 'configuration'

export function fetchConfiguration(): Promise<IConfiguration> {
    return axiosApiInstance.get(`${prefix}`).then((res) => res.data)
}

export function fetchPriceTiers(): Promise<number[]> {
    return axiosApiInstance.get(`${prefix}/price-tiers`).then((res) => res.data)
}

export function updateConfiguration(data: Partial<IConfiguration>): Promise<IConfiguration> {
    return axiosApiInstance.patch(`${prefix}`, data).then((res) => res.data)
}
