import { TPermission } from '../../../../utils/constants/role.constant'
import IDocumentPermission from './document-permission.interface'
import IModel from './model.interface'

export interface IRolePermission extends IModel {
    documentPermission: IDocumentPermission
    enabledPermissions: TPermission[]
    onlyForCreator: boolean
}

export type TRoleName = 'Admin' | 'Instructor' | 'Student' | 'Editor' | string
export default interface IRole extends IModel {
    name: TRoleName
    ordering: number
    status: string
    description?: string
    permissions: IRolePermission[]
    createdAt: string
    updatedAt?: string
}
