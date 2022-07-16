import { useQuery, UseQueryOptions } from 'react-query'
import { countInstructors, fetchInstructors } from '../../../apis/acp/performances/performances.api'
import IClientUrlParams from '../interfaces/client-url-params.interface'
import IInstructorWithStat from '../interfaces/instructor-with-stat.interface'
import { useAdminUrlParams } from '../providers/admin-query.provider'

export const RQK_INSTRUCTORS = 'instructors'
export function useInstructorsQuery(options?: UseQueryOptions<IInstructorWithStat[]>) {
    const query = useAdminUrlParams()
    return useQuery<IInstructorWithStat[]>([RQK_INSTRUCTORS, query], fetchInstructors, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
        ...options,
    })
}

export function useCountInstructorsQuery(
    query: IClientUrlParams,
    options?: UseQueryOptions<number>
) {
    return useQuery<number>([RQK_INSTRUCTORS, query, 'count'], countInstructors, {
        keepPreviousData: true,
        notifyOnChangeProps: 'tracked',
        ...options,
    })
}
