import { useQuery, UseQueryOptions } from 'react-query'
import { countStudents, fetchStudents } from '../../../apis/user/user-instructor.api'
import IStudent from '../interfaces/student.interface'
import { useInstructorParams } from '../providers/instructor-params.provider'
import { useStudentsUrlParams } from './../hooks/students.url-params.hook'

export const RQK_STUDENTS = 'students'
export const useStudentsQuery = (options?: UseQueryOptions<IStudent[]>) => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useStudentsUrlParams()
    return useQuery<IStudent[]>([RQK_STUDENTS, clientQuery, viewInstructorId], fetchStudents, {
        notifyOnChangeProps: 'tracked',
        ...options,
    })
}

export const RQK_COUNT_STUDENTS = 'count-students'
export const useCountStudentsQuery = () => {
    const {
        state: { viewInstructorId },
    } = useInstructorParams()
    const clientQuery = useStudentsUrlParams()
    return useQuery<number>([RQK_COUNT_STUDENTS, clientQuery, viewInstructorId], countStudents, {
        keepPreviousData: true,
    })
}
