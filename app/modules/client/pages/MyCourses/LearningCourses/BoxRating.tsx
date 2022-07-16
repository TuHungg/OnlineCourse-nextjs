import {
    Button,
    ButtonGroup,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { RatingStar } from 'rating-star'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'
import { apiCreateUserReview } from '../../../../../apis/user/user-review.api'
import FormMsg from '../../../../../utils/constants/form-message.constant'
import lan from '../../../../../utils/constants/lan.constant'
import { useSimpleDialog } from '../../../../admin/providers/simple-dialog.provider'
import MyTextarea from '../../../../shared/components/MyTextarea'
import SubmitButton from '../../../../shared/components/SubmitButton'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import { useClientToast } from '../../../../shared/hooks/client-toast.hook'
import IReview from '../../../../shared/interfaces/models/review.interface'
import {
    RQK_USER_REVIEW,
    useDeleteUserReview,
    useUpdateUserReview,
    useUserRatingQuery,
} from '../../../queries/user-review-query.hook'
import NotifyHelper from './../../../../../utils/helpers/notify.helper'

interface FormData {
    rating: number
    content: string
}

const vldSchema = yup.object({
    rating: yup.number().required(FormMsg.required),
    content: yup.string().nullable(),
})

interface BoxRatingProps {
    courseId: string
}

const DeleteButton = (props: { reviewId: string; courseId: string; onClose: () => void }) => {
    const toast = useClientToast()
    const { onShow } = useSimpleDialog()
    const { mutate: deleteReview } = useDeleteUserReview()
    const onDelete = async () => {
        onShow({
            title: `Do you want to delete this review?`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                try {
                    await deleteReview({ courseId: props.courseId, reviewId: props.reviewId })
                    toast(NotifyHelper.success('Review deleted sucessfully.'))
                    props.onClose()
                } catch (e: any) {
                    console.error(e)
                }
            },
        })
    }
    return (
        <Button colorScheme={'red'} onClick={onDelete}>
            Delete
        </Button>
    )
}

const BoxRating = (props: BoxRatingProps) => {
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate: onUpdate } = useUpdateUserReview()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting, isValid },
        setValue,
        reset,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
        mode: 'onChange',
    })
    const { isLoading: isUserRatingLoading, data: userReview } = useUserRatingQuery(props.courseId)

    const toast = useAppToast()
    const [message, setMessage] = useState<string>()

    useEffect(() => {
        if (!!userReview) {
            reset(userReview || undefined)
        } else {
            reset({})
        }
    }, [reset, userReview])

    const ratingW = watch('rating')
    useEffect(() => {
        switch (ratingW) {
            case 1:
                setMessage('Awful, not what I expected at all 😒')
                break
            case 2:
                setMessage('Poor, pretty disappointed 🙁')
                break
            case 3:
                setMessage('Average, could be better 🤔')
                break
            case 4:
                setMessage('Good, what I expected 😀')
                break
            case 5:
                setMessage('Amazing, above expectations 😊')
                break
            default:
                setMessage('Select rating')
                break
        }
    }, [ratingW])

    const onRatingChange = (score: number) => {
        setValue('rating', score, { shouldDirty: true, shouldValidate: true })
    }

    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<IReview> = {
            rating: values.rating!,
            content: values.content,
            course: props.courseId as any,
        }
        try {
            if (!!userReview) {
                // edit
                await onUpdate(
                    { courseId: props.courseId, data },
                    {
                        onSuccess: () => {
                            toast(NotifyHelper.success('Review updated sucessfully.'))
                        },
                    }
                )
            } else {
                // create
                await apiCreateUserReview(data)
                toast(NotifyHelper.success('Thank you for your rating.'))
                queryClient.invalidateQueries([RQK_USER_REVIEW, props.courseId])
            }
        } catch (err) {
            console.error(err)
        }
        reset(values)
    })
    return (
        <Skeleton isLoaded={!isUserRatingLoading}>
            <Button
                size="sm"
                variant={'link'}
                onClick={(e) => {
                    onOpen(), e.preventDefault()
                }}
            >
                {!userReview ? <>Leave a Rating</> : <>Edit Rating</>}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader margin={'auto'}>How would you rate this course?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={onSubmit}>
                            <Stack spacing={8}>
                                <Stack spacing={4}>
                                    <Text textAlign={'center'} fontSize={'lg'}>
                                        {message}
                                    </Text>
                                    <RatingStar
                                        clickable
                                        maxScore={5}
                                        id="rating-star"
                                        size={50}
                                        rating={ratingW}
                                        onRatingChange={onRatingChange}
                                    />
                                    <MyTextarea
                                        field="content"
                                        label={'Content'}
                                        //@ts-ignore
                                        placeholder="How do you feel about this course?"
                                        register={register}
                                        error={errors.content}
                                        maxLength={1000}
                                        watch={watch}
                                        showLabelRow={false}
                                    />
                                </Stack>

                                <ButtonGroup justifyContent={'end'}>
                                    {!userReview ? (
                                        <SubmitButton
                                            disabled={!isDirty || isSubmitting || !isValid}
                                        />
                                    ) : (
                                        <HStack>
                                            <DeleteButton
                                                courseId={props.courseId}
                                                reviewId={userReview._id}
                                                onClose={onClose}
                                            />
                                            <SubmitButton
                                                disabled={!isDirty || isSubmitting || !isValid}
                                            >
                                                Update
                                            </SubmitButton>
                                        </HStack>
                                    )}
                                </ButtonGroup>
                            </Stack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Skeleton>
    )
}

export default BoxRating
