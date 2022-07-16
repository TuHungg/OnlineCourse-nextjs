import { Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { apiVerifyEmail } from '../../../apis/auth.api'
import NotifyHelper from '../../../utils/helpers/notify.helper'
import PathHelper from '../../../utils/helpers/path.helper'
import MyInput from '../../shared/components/MyInput'
import SubmitButton from '../../shared/components/SubmitButton'
import { useAppToast } from '../../shared/hooks/app-toast.hook'

interface FormData {
    permissionCode: string
}

const vldSchema = yup.object({
    permissionCode: yup.string().required(),
})
export default function UserVerificationForm() {
    const toast = useAppToast()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting, isSubmitted },
        reset,
        watch,
        setError,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })
    const onSubmit = handleSubmit(async (values) => {
        try {
            await apiVerifyEmail(values.permissionCode)
            router.push(PathHelper.getLoginPath())
            toast(NotifyHelper.success('Sign Up success!'))
        } catch (e) {
            setError('permissionCode', { message: 'is incorrect!' })
        }
    })
    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={4}>
                <MyInput
                    autoFocus
                    label="Verification Code"
                    placeholder="eg. 1234"
                    field="permissionCode"
                    register={register}
                    error={errors.permissionCode}
                    helperText="We have sent verification code to your email."
                />
                <SubmitButton isDisabled={!isDirty || isSubmitting} />
            </Stack>
        </form>
    )
}
