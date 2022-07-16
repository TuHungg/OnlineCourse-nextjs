import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import { useSelector } from 'react-redux'
import { apiCreate, apiDeleteOne, apiUpdate } from '../../../apis/acp/admin.api'
import { countUnitComments, fetchUnitComments } from '../../../apis/comment.api'
import Helper from '../../../utils/helpers/helper.helper'
import QueryHelper from '../../../utils/helpers/QueryHelper'
import IComment from '../../shared/interfaces/models/comment.interface'
import { selectLearnCourseId } from './../../../store/course/learn-course.slice'

const itemsPerPage = 5

const useCountUnitComments = (courseId?: string, unitId?: string) => {
    return useQuery<number>(
        [RQK_UNIT_COMMENTS, courseId, unitId, 'count'],
        () => countUnitComments(courseId!, unitId!),
        {
            keepPreviousData: true,
            enabled: !!courseId && !!unitId,
            staleTime: Infinity,
        }
    )
}

export const RQK_UNIT_COMMENTS = 'unit-comments'
export const useUnitComments = (unitId?: string, options?: UseInfiniteQueryOptions<IComment[]>) => {
    const courseId = useSelector(selectLearnCourseId)
    const { data: count } = useCountUnitComments(courseId, unitId)
    return useInfiniteQuery<IComment[]>(
        [RQK_UNIT_COMMENTS, courseId, unitId, itemsPerPage],
        fetchUnitComments,
        {
            notifyOnChangeProps: 'tracked',
            getNextPageParam: (_lastPage, pages) =>
                QueryHelper.getNextPageParams(pages.length, itemsPerPage, count!!),
            keepPreviousData: true,
            enabled: !!courseId && !!unitId,
            ...options,
        }
    )
}

export const useDeleteUnitComment = () => {
    const queryClient = useQueryClient()
    return useMutation((id: string) => apiDeleteOne<IComment>('comments', id), {
        onSuccess: (item) => {
            queryClient.invalidateQueries([RQK_UNIT_COMMENTS, item.course, item.unit, itemsPerPage])
        },
    })
}

export const useUpdateUnitComment = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (payload: { id: string; data: Partial<IComment> }) =>
            apiUpdate<IComment>('comments', payload.id, payload.data),
        {
            onMutate: () => {},
            onSuccess: (item) => {
                queryClient.invalidateQueries([
                    RQK_UNIT_COMMENTS,
                    item.course,
                    item.unit,
                    itemsPerPage,
                ])
            },
        }
    )
}

export const useAddUnitComment = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (newComment: Partial<IComment>) =>
            apiCreate<IComment>('comments', {
                ...newComment,
                course: newComment.course?._id as any,
                user: newComment.user?._id as any,
                unit: newComment.unit?._id as any,
            }),
        {
            onMutate: async (newComment) => {
                const keys = [
                    RQK_UNIT_COMMENTS,
                    newComment.course?._id,
                    newComment.unit?._id,
                    itemsPerPage,
                ]
                await queryClient.cancelQueries(RQK_UNIT_COMMENTS)
                const previousData = queryClient.getQueryData(keys)
                queryClient.setQueryData<{ pages: IComment[][]; pageParams: number[] }>(
                    keys,
                    (oldQueryData) => {
                        return {
                            pages: [
                                [
                                    {
                                        _id: Helper.genRadomId(),
                                        timestamps: {
                                            createdAt: new Date().toISOString(),
                                        },
                                        ...newComment,
                                    } as IComment,
                                    ...(oldQueryData?.pages[0] || []),
                                ],
                                ...(oldQueryData?.pages.slice(1) || []),
                            ],
                            pageParams: oldQueryData?.pageParams || [],
                        }
                    }
                )
                return {
                    previousData,
                }
            },
            onError: (_error, _comment, context: any) => {
                queryClient.setQueryData(RQK_UNIT_COMMENTS, context.previousData)
            },
            onSettled: (data) => {
                queryClient.invalidateQueries([
                    RQK_UNIT_COMMENTS,
                    data?.course,
                    data?.unit,
                    itemsPerPage,
                ])
            },
        }
    )
}
