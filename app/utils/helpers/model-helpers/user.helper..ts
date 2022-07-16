import TypeHelper from '../type.helper'
import { IRolePermission } from './../../../modules/shared/interfaces/models/role.interface'
import { IUser } from './../../../modules/shared/interfaces/models/user.interface'
import { TDocumentName, TPermission } from './../../constants/role.constant'
export default class UserHelper {
    static getUserPermissions(user: IUser) {
        const role = TypeHelper.isRole(user.role) ? user.role : undefined
        if (role) {
            return role.permissions
        }
        return undefined
    }
    // static hasPermission(
    //     user: IUser,
    //     documentType: TDocumentName,
    //     permission: TPermission,
    //     onlyForCreator: boolean = false
    // ) {
    //     const role = TypeHelper.isRole(user.role) ? user.role : undefined
    //     if (role) {
    //         const rolePermission = role.permissions.find(
    //             (item) => item.documentPermission.name == documentType
    //         )
    //         if (rolePermission?.enabledPermissions) {
    //             const isPermissionExist = rolePermission.enabledPermissions.indexOf(permission) > -1
    //             const hasPermission =
    //                 isPermissionExist && (onlyForCreator || !rolePermission.onlyForCreator)
    //             return hasPermission
    //         }
    //     }
    //     return false
    // }
}

export const hasViewPermission = (
    permissions: IRolePermission[],
    documentType: TDocumentName,
    onlyForCreator: boolean = false
) => {
    return (
        hasPermission(permissions, documentType, 'read', onlyForCreator) ||
        hasPermission(permissions, documentType, 'view', onlyForCreator)
    )
}

export const hasPermission = (
    permissions: IRolePermission[],
    documentType: TDocumentName,
    permission: TPermission,
    onlyForCreator: boolean = false
) => {
    const rolePermission = permissions.find((item) => item.documentPermission.name == documentType)
    if (rolePermission?.enabledPermissions) {
        const isPermissionExist = rolePermission.enabledPermissions.indexOf(permission) > -1
        const hasPermission =
            isPermissionExist && (onlyForCreator || !rolePermission.onlyForCreator)
        return hasPermission
    }
    return false
}
