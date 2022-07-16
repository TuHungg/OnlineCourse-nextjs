import IModel from './model.interface'
import { IUser } from './user.interface'

interface IClient {
    type: string
    name: string
    version: string
    engine: string
    engineVersion: string
}

interface IOs {
    name: string
    version: string
    platform: string
}

interface IDevice {
    type: string
    brand: string
    model: string
}

//
interface IGeolocation {
    lat: number
    long: number
}
export interface IGeolocationInfo {
    geolocation?: IGeolocation
    message?: string
}

interface IDeviceInfo {
    ip: string
    geolocationInfo: IGeolocationInfo
    //
    client: IClient
    os: IOs
    device: IDevice
    bot: string | null
}

export interface IActivityLog extends IModel {
    user?: IUser
    deviceInfo: IDeviceInfo
    content: string
    timestamp: string
}
