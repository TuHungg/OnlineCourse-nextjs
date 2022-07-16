import { Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { apiResetPassWord } from '../../../../apis/auth.api'
import AppMsg from '../../../../utils/constants/app-messsage.constant'
import lan from '../../../../utils/constants/lan.constant'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import PathHelper from '../../../../utils/helpers/path.helper'
import { UserValidation } from '../../../../validations/user.validation'
import MyInput from '../../../shared/components/MyInput'
import SubmitButton from '../../../shared/components/SubmitButton'
import { useAppToast } from '../../../shared/hooks/app-toast.hook'
import { useAuth } from '../../providers/auth.provider'

interface FormData {
    password: string
    passwordConfirmation: string
}

const vldSchema = yup.object({
    password: UserValidation.password,
    passwordConfirmation: UserValidation.passwordConfirmation,
})

const ResetPasswordForm = () => {
    const {
        methods: { isHuman },
    } = useAuth()

    const router = useRouter()
    const token = router.query.token

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({ resolver: yupResolver(vldSchema) })

    const toast = useAppToast()
    const reRef = React.useRef<ReCAPTCHA>(null)

    const onSubmit = handleSubmit(async (values) => {
        if (!token) {
            toast(NotifyHelper.warning(`Token ${lan.INVALID}`))
            return
        }
        const tokenRecaptcha = reRef.current!.getValue()
        if (!tokenRecaptcha) {
            toast(NotifyHelper.warning(AppMsg.PLEASE_CONFIRM_RECAPTCHA))
            return
        }

        const notBot = await isHuman(tokenRecaptcha)
        if (notBot) {
            await apiResetPassWord((token as string) || '', values.password)
            reset(values)
            router.replace(PathHelper.getLoginPath())
            toast(NotifyHelper.success(`Password ${lan.UPDATED_SUCCESS}`))
            toast(NotifyHelper.success(AppMsg.CAN_NOW_LOGIN_WITH_NEW_PASS))
        }
        reRef.current?.reset()
    })

    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={4}>
                <Stack>
                    <MyInput
                        required
                        field="password"
                        type="password"
                        placeholder={'New password'}
                        label={'New password'}
                        register={register}
                        error={errors.password}
                        watch={watch}
                        showLabelRow={false}
                        autoFocus={true}
                    />
                    <MyInput
                        required
                        field="passwordConfirmation"
                        type="password"
                        placeholder={'Confirm new password'}
                        label={'Password confirmation'}
                        register={register}
                        error={errors.passwordConfirmation}
                        watch={watch}
                        showLabelRow={false}
                    />
                    <ReCAPTCHA
                        ref={reRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        size="normal"
                    />
                </Stack>
                <SubmitButton disabled={!isDirty || isSubmitting}>Reset password</SubmitButton>
            </Stack>
        </form>
    )
}

export default ResetPasswordForm
