import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import {
    addRolePermission,
    deleteRolePermission,
    fetchRolePermissions,
    updateRolePermission,
} from '../../../apis/role-permission.api'
import { TPermission } from './../../../utils/constants/role.constant'
import { IRolePermission } from './../../shared/interfaces/models/role.interface'

const RQK_ROLE_PERMISSIONS = 'role-permissions'
export function useRolePermissionsQuery(
    roleId?: string,
    documentPermissionId?: string,
    options?: UseQueryOptions<IRolePermission[]>
) {
    return useQuery<IRolePermission[]>(
        [RQK_ROLE_PERMISSIONS, roleId, documentPermissionId],
        () => fetchRolePermissions(roleId!, documentPermissionId),
        {
            notifyOnChangeProps: 'tracked',
            enabled: !!roleId,
            // keepPreviousData: true,
            ...options,
        }
    )
}

export const useDeleteRolePermission = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (payload: { roleId: string; documentPermissionId: string }) =>
            deleteRolePermission(payload.roleId, payload.documentPermissionId),
        {
            onSuccess: (_, context) => {
                queryClient.invalidateQueries([RQK_ROLE_PERMISSIONS, context.roleId])
            },
        }
    )
}
export const useUpdateRolePermission = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (payload: {
            roleId: string
            documentPermissionId: string
            data: {
                enabledPermissions?: TPermission[]
                onlyForCreator?: boolean
            }
        }) => updateRolePermission(payload.roleId, payload.documentPermissionId, payload.data),
        {
            onMutate: () => {},
            onSuccess: (_, context) => {
                queryClient.invalidateQueries([RQK_ROLE_PERMISSIONS, context.roleId])
            },
        }
    )
}
export const useAddRolePermission = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (payload: { roleId: string; documentPermissionId: string }) =>
            addRolePermission(payload.roleId, payload.documentPermissionId),
        {
            onSuccess: (_, context) => {
                queryClient.invalidateQueries([RQK_ROLE_PERMISSIONS, context.roleId])
            },
        }
    )
}
