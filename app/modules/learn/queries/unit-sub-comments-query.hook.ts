import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { useSelector } from 'react-redux'
import { apiCreate, apiDeleteOne, apiUpdate } from '../../../apis/acp/admin.api'
import { fetchUnitSubComments } from '../../../apis/comment.api'
import IComment from '../../shared/interfaces/models/comment.interface'
import { selectActiveUnit, selectLearnCourseId } from './../../../store/course/learn-course.slice'
export const RQK_UNIT_SUB_COMMENTS = 'unit-sub-comments'
export const useUnitSubCommentsQuery = (
    parentId?: string,
    enabled?: boolean,
    options?: UseQueryOptions<IComment[]>
) => {
    const courseId = useSelector(selectLearnCourseId)
    const unit = useSelector(selectActiveUnit)

    return useQuery<IComment[]>(
        [RQK_UNIT_SUB_COMMENTS, courseId, unit?._id, parentId],
        fetchUnitSubComments,
        {
            ...options,
            enabled: !!courseId && !!unit?._id && !!parentId && !!enabled,
        }
    )
}

export const useUpdateUnitSubComment = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (payload: { id: string; data: Partial<IComment> }) =>
            apiUpdate<IComment>('comments', payload.id, payload.data),
        {
            onMutate: () => {},
            onSuccess: (item) => {
                queryClient.invalidateQueries([
                    RQK_UNIT_SUB_COMMENTS,
                    item.course,
                    item.unit,
                    item.parent,
                ])
            },
        }
    )
}

export const useDeleteUnitSubComment = () => {
    const queryClient = useQueryClient()
    return useMutation((id: any) => apiDeleteOne<IComment>('comments', id), {
        onSuccess: (item) => {
            queryClient.invalidateQueries([
                RQK_UNIT_SUB_COMMENTS,
                item.course,
                item.unit,
                item.parent,
            ])
        },
    })
}

export const useAddSubComment = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (newComment: Partial<IComment>) =>
            apiCreate<IComment>('comments', {
                ...newComment,
                course: newComment.course?._id as any,
                user: newComment.user?._id as any,
                unit: newComment.unit?._id as any,
                parent: newComment.parent?._id as any,
            }),
        {
            onSuccess: async (comment) => {
                queryClient.invalidateQueries([
                    RQK_UNIT_SUB_COMMENTS,
                    comment.course,
                    comment.unit,
                    comment.parent,
                ])
            },
        }
    )
}
