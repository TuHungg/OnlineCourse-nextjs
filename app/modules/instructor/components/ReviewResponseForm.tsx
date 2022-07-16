import { Avatar, ButtonGroup, HStack, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormMsg from '../../../utils/constants/form-message.constant'
import { useAuth } from '../../auth/providers/auth.provider'
import CancelButton from '../../shared/components/CancelButton'
import MyTextarea from '../../shared/components/MyTextarea'
import SubmitButton from '../../shared/components/SubmitButton'
import { IReviewResponse } from '../../shared/interfaces/models/review.interface'
import { useInstructorCourseReview } from '../providers/instructor-course-review.provider'
import { useUpdateReviewResponse } from '../queries/instructor-course-reviews-query'

interface FormData {
    content: string
}

const vldSchema = yup.object({
    content: yup.string().required(FormMsg.required),
})

export interface ReviewResponseFormProps {}

function ReviewResponseForm({ ...props }: ReviewResponseFormProps) {
    const {
        state: { review },
        methods: { setWritingResponse: setWritingRespond },
    } = useInstructorCourseReview()
    const {
        state: { user },
    } = useAuth()
    const { mutate: updateReview } = useUpdateReviewResponse()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })

    // set default value
    useEffect(() => {
        reset({
            content: review.response?.content,
        })
    }, [review.response?.content, reset])
    //
    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<IReviewResponse> = {
            content: values.content,
        }
        await updateReview({ id: review._id, data })
        reset()
        setWritingRespond(false)
    })
    const onCancel = () => {
        reset()
        setWritingRespond(false)
    }
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
                        autoFocus
                        field="content"
                        label={'Review content'}
                        placeholder={'Add a review'}
                        register={register}
                        error={errors.content}
                        maxLength={1000}
                        watch={watch}
                        showLabelRow={false}
                    />
                    <ButtonGroup justifyContent={'end'}>
                        <CancelButton onClick={onCancel}>Cancel</CancelButton>
                        <SubmitButton disabled={!isDirty || isSubmitting}>
                            {review.response?.content ? 'Update response' : 'Add response'}
                        </SubmitButton>
                    </ButtonGroup>
                </Stack>
            </form>
        </HStack>
    )
}

export default React.memo(ReviewResponseForm)
