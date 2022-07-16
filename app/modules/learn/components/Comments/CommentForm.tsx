import { Avatar, ButtonGroup, HStack, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { selectActiveUnit } from '../../../../store/course/learn-course.slice'
import FormMsg from '../../../../utils/constants/form-message.constant'
import { useAuth } from '../../../auth/providers/auth.provider'
import CancelButton from '../../../shared/components/CancelButton'
import MyTextarea from '../../../shared/components/MyTextarea'
import SubmitButton from '../../../shared/components/SubmitButton'
import IComment from '../../../shared/interfaces/models/comment.interface'
import { useLearnCourseQuery } from '../../hooks/user-course-query.hook'
import { useAddUnitComment, useUpdateUnitComment } from '../../queries/unit-comments-query.hook'
import {
    useAddSubComment,
    useUpdateUnitSubComment,
} from '../../queries/unit-sub-comments-query.hook'

interface FormData {
    content: string
}

const vldSchema = yup.object({
    content: yup.string().required(FormMsg.required),
})

export interface CommentFormProps {
    comment?: IComment
    parentId?: string
    onCancel?: () => void
}
function CommentForm({ ...props }: CommentFormProps) {
    const {
        state: { user },
    } = useAuth()
    const { mutate: addPrimaryComment } = useAddUnitComment()
    const { mutate: addSubComment } = useAddSubComment()
    const { mutate: updateSubComment } = useUpdateUnitSubComment()
    const { mutate: updatePrimaryComment } = useUpdateUnitComment()
    const { data: learnCourse } = useLearnCourseQuery()
    const unit = useSelector(selectActiveUnit)
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })

    // set default value
    useEffect(() => {
        reset({
            content: props.comment?.content,
        })
    }, [props.comment?.content, reset])
    //
    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<IComment> = {
            parent: null,
            content: values.content,
            course: learnCourse?.course,
            user: user!,
            unit: unit,
        }
        if (!!props.comment) {
            //edit
            const data: Partial<IComment> = {
                content: values.content,
            }
            if (!props.parentId) {
                // primary
                await updatePrimaryComment({ id: props.comment._id, data })
            } else {
                // sub
                await updateSubComment({ id: props.comment._id, data })
            }
        } else {
            //add
            if (!props.parentId) {
                //primary
                await addPrimaryComment(data)
            } else {
                //sub
                await addSubComment({
                    ...data,
                    parent: {
                        _id: props.parentId,
                    } as IComment,
                })
            }
        }
        // queryClient.invalidateQueries(RQK_UNIT_COMMENTS)
        if (!!props.onCancel) props.onCancel()
        else reset({ content: '' })
    })
    return (
        <HStack align="start" spacing={{ base: 0, sm: 4 }}>
            <Avatar
                display={['none', 'inline-block']}
                name={user?.profile.firstName}
                src={user!.profile.avatar || ''}
                size={'md'}
            />
            <form onSubmit={onSubmit} style={{ flex: 1 }}>
                <Stack>
                    <MyTextarea
                        field="content"
                        label={'Comment content'}
                        placeholder={'Add a comment'}
                        register={register}
                        error={errors.content}
                        maxLength={255}
                        watch={watch}
                        showLabelRow={false}
                    />
                    <ButtonGroup justifyContent={'end'}>
                        {!!props.onCancel ? (
                            <CancelButton onClick={props.onCancel}>Cancel</CancelButton>
                        ) : null}
                        <SubmitButton disabled={!isDirty || isSubmitting}>Add comment</SubmitButton>
                    </ButtonGroup>
                </Stack>
            </form>
        </HStack>
    )
}

export default React.memo(CommentForm)
