import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { useFetchById } from '../../shared/hooks/data/admin-query.hook'
import IRole from '../../shared/interfaces/models/role.interface'

interface IPermissionManagementProvider {
    state: {
        isRuleChanged: boolean
        documentPermissionId?: string
        role?: IRole
    }
    methods: {
        setDocumentPermissionId: (val?: string) => void
        setRoleId: (val?: string) => void
        setRuleChanged: (val: boolean) => void
    }
}
const PermissionManagementContext = createContext<IPermissionManagementProvider>(
    {} as IPermissionManagementProvider
)

export const usePermissionManagement = () => {
    return useContext(PermissionManagementContext)
}

export function PermissionManagementProvider({ children }: { children: ReactNode }) {
    const [isRuleChanged, setRuleChanged] = useState(false)
    const [roleId, setRoleId] = useState<string>()
    const [documentPermissionId, setDocumentPermissionId] = useState<string>()
    const { data: role } = useFetchById<IRole>('roles', roleId)
    //
    const state: IPermissionManagementProvider = useMemo(
        () => ({
            state: {
                role,
                documentPermissionId,
                isRuleChanged,
            },
            methods: {
                setDocumentPermissionId,
                setRoleId,
                setRuleChanged,
            },
        }),
        [documentPermissionId, isRuleChanged, role]
    )
    return (
        <PermissionManagementContext.Provider value={state}>
            {children}
        </PermissionManagementContext.Provider>
    )
}
