import { useQuery, UseQueryOptions } from 'react-query'
import { countClientFilter } from '../../../apis/course/client-course.api'
import ICountResult from '../interfaces/count-result.interface'
import { useFilterCoursesClientQuery } from './filter-courses-query.hook'

export const RQK_COUNT_CLIENT_FILTER = 'count-client-filter'
export const useCountClientFilterQuery = (
    fields: string[],
    options?: UseQueryOptions<ICountResult[]>
) => {
    const clientQuery = useFilterCoursesClientQuery()
    return useQuery<ICountResult[]>(
        [RQK_COUNT_CLIENT_FILTER, clientQuery, fields],
        countClientFilter,
        {
            keepPreviousData: true,
            notifyOnChangeProps: 'tracked',
            ...options,
        }
    )
}
