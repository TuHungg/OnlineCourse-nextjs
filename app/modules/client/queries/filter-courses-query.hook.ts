import { useQuery } from 'react-query'
import { countClientCourses, fetchClientCourses } from '../../../apis/course/client-course.api'
import ICourse from '../../shared/interfaces/models/course.interface'
import { useClientUrlParams } from './../hooks/client-url-params.hook'
import { useCatDetailQuery } from './cat-detail-query.hook'

export const useFilterCoursesClientQuery = () => {
    const catData = useCatDetailQuery().data
    const clientQuery = useClientUrlParams()
    if (!!catData) {
        clientQuery[`categories.slug_filter`] = catData.slug
        delete clientQuery.catSlugs
    }
    return clientQuery
}

export const RQK_FILTER_COURSES = 'filter-courses'
export const useFilterCoursesQuery = () => {
    const clientQuery = useFilterCoursesClientQuery()
    return useQuery<ICourse[]>([RQK_FILTER_COURSES, clientQuery], fetchClientCourses, {
        notifyOnChangeProps: 'tracked',
    })
}

export const RQK_COUNT_FILTER_COURSES = 'count-filter-courses'
export const useCountFilterCoursesQuery = () => {
    const clientQuery = useFilterCoursesClientQuery()
    return useQuery<number>([RQK_COUNT_FILTER_COURSES, clientQuery], countClientCourses, {
        notifyOnChangeProps: 'tracked',
        keepPreviousData: true,
    })
}
