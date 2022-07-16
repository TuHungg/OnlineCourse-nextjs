import { ButtonGroup, Heading, HStack, Skeleton, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormMsg from '../../../../../utils/constants/form-message.constant'
import NotifyHelper from '../../../../../utils/helpers/notify.helper'
import MyInput from '../../../../shared/components/MyInput'
import SubmitButton from '../../../../shared/components/SubmitButton'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import IConfiguration from '../../../../shared/interfaces/models/configuration.interface'
import {
    useConfigurationQuery,
    useUpdateConfiguration,
} from '../../../queries/configuration-query.hook'

const vldSchema = yup.object({
    instructorCommission: yup.number().required(FormMsg.required),
})

type FormData = {
    instructorCommission: number
}
export default function InstructorCommissionForm() {
    const toast = useAppToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
        defaultValues: {},
    })
    //
    const { isLoading, data } = useConfigurationQuery()
    const { mutate: updateConfiguration } = useUpdateConfiguration()

    useEffect(() => {
        if (!!data) {
            const formData: FormData = {
                instructorCommission: data.money.instructorCommission,
            }
            reset(formData)
        }
    }, [data, reset])

    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<IConfiguration> = {
            money: {
                instructorCommission: Number.parseFloat(values.instructorCommission + ''),
            },
        }
        updateConfiguration(data, {
            onSuccess: (_) => {
                toast(NotifyHelper.success('Configuration updated'))
            },
            onError: (_) => {
                toast(NotifyHelper.somethingWentWrong)
            },
        })
    })

    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={4}>
                <Heading fontSize={'xl'}>Instructor Commission</Heading>
                <Skeleton isLoaded={!isLoading}>
                    <Stack justify={'start'}>
                        <MyInput
                            required
                            field="instructorCommission"
                            label={'Instructor commission'}
                            register={register}
                            error={errors.instructorCommission}
                        />

                        <ButtonGroup justifyContent={'end'}>
                            <SubmitButton disabled={!isDirty || isSubmitting} size={'sm'} />
                        </ButtonGroup>
                    </Stack>
                </Skeleton>
            </Stack>
        </form>
    )
}
