import { selectLearnId } from './../../../store/course/learn-course.slice'
import { useSelector } from 'react-redux'
import { useQuery, UseQueryOptions } from 'react-query'
import { ILearnUnit } from './../../shared/interfaces/models/user_course.interface'
import { fetchLearnUnit } from '../../../../app/apis/user/user-learning.api'

export const RQK_LEARN_UNIT = 'learn-unit'

export const useLearnUnit = (unitId?: string, options?: UseQueryOptions<ILearnUnit>) => {
    const learnId = useSelector(selectLearnId)
    return useQuery<ILearnUnit>(
        [RQK_LEARN_UNIT, learnId, unitId],
        () => fetchLearnUnit(learnId!, unitId!),
        {
            notifyOnChangeProps: 'tracked',
            enabled: !!learnId && !!unitId,
            ...options,
        }
    )
}
