import { ButtonGroup, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { selectFormCourse, updateCourseById } from '../../../store/course/form-course.slice'
import MyTextarea from '../../shared/components/MyTextarea'
import SubmitButton from '../../shared/components/SubmitButton'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import ICourse from '../../shared/interfaces/models/course.interface'
import { RQK_COURSE } from '../hooks/course-query.hook'

interface FormData {
    welcome: string
    congratulations: string
}

const vldSchema = yup.object({
    welcome: yup.string().nullable(),
    congratulations: yup.string().nullable(),
})

function MessageForm() {
    const item = useSelector(selectFormCourse)
    //
    const queryClient = useQueryClient()
    const { onXThunkUpdate } = useCrudActions()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })

    // SET DEFAULT VALUE
    useEffect(() => {
        if (!!item) {
            const defaultValues: Partial<FormData> = {
                welcome: item?.messages?.welcome,
                congratulations: item?.messages?.congratulations,
            }
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item?.messages?.welcome, item?.messages?.congratulations, reset])

    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<ICourse> = {
            messages: {
                welcome: values.welcome,
                congratulations: values.congratulations,
            },
        }
        await onXThunkUpdate(updateCourseById(data))
        queryClient.invalidateQueries(RQK_COURSE)
    })
    return (
        <form onSubmit={onSubmit}>
            <Stack>
                <MyTextarea
                    field="welcome"
                    label={'Welcome'}
                    register={register}
                    error={errors.welcome}
                    autoFocus
                    maxLength={1000}
                    watch={watch}
                />
                <MyTextarea
                    field="congratulations"
                    label={'Congratulations'}
                    register={register}
                    error={errors.congratulations}
                    maxLength={1000}
                    watch={watch}
                />
                <ButtonGroup justifyContent={'end'}>
                    <SubmitButton disabled={!isDirty || isSubmitting} />
                </ButtonGroup>
            </Stack>
        </form>
    )
}

export default React.memo(MessageForm)
