import Helper from '../../../../utils/helpers/helper.helper'
import TemplateHelper from '../../../../utils/helpers/template.helper'
import { IUser } from '../../interfaces/models/user.interface'

export const transformUsers = (items: IUser[]): IUser[] => {
    return items.map((item: IUser): IUser => {
        const cloneItem = Helper.cloneObj(item)
        // PROFILE
        const profile = {
            ...cloneItem.profile,
            fullName: TemplateHelper.toFullName(
                cloneItem.profile.firstName,
                cloneItem.profile.lastName
            ),
        }
        cloneItem.profile = profile

        //
        // cloneItem.createdAt = new Date(cloneItem.createdAt);
        // cloneItem.modifiedAt = cloneItem.modifiedAt ? new Date(cloneItem.modifiedAt) : undefined;
        return cloneItem
    })
}

// const options: UseQueryOptions<IUser[]> = {
//     select: onSelect,
//     keepPreviousData: true,
//     notifyOnChangeProps: ['data'],
// }

// export const QK_USERS = 'users';
// export const useUsersData = (query: IAdminClientQuery, enabled: boolean = true) => {
//     return useQueries([
//         {
//             queryKey: [QK_USERS, query],
//             queryFn: fetchAllUsers,
//             ...options,
//             enabled
//         },
//         {
//             queryKey: [QK_COUNT_USERS, query],
//             queryFn: countUsers,
//             keepPreviousData: true,
//             enabled
//         },
//     ])
// }

// export const useUsers = (query: IAdminClientQuery) => {
//     return useQuery<IUser[]>([QK_USERS, query], fetchAllUsers, options);
// }

// export const QK_COUNT_USERS = 'count-users';
// export const useCountUsers = (query: IAdminClientQuery) => {
//     return useQuery<number>([QK_COUNT_USERS, query], countUsers);
// }
