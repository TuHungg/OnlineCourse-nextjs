import { Button, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import { UserValidation } from '../../../../validations/user.validation'
import MyInput from '../../../shared/components/MyInput'
import { useAppToast } from '../../../shared/hooks/app-toast.hook'
import SignUpSupport from '../../components/SignUpSupport'
import UserVerificationForm from '../../components/UserVerificationForm'
import { useAuth } from '../../providers/auth.provider'

interface FormData {
    firstName: string
    lastName: string
    email: string
    password: string
}

const vldSchema = yup.object({
    firstName: UserValidation.firstName,
    lastName: UserValidation.lastName,
    email: UserValidation.email(),
    password: UserValidation.password,
})

export default function SignUpForm() {
    const {
        methods: { onSignUp, isHuman },
    } = useAuth()
    const [isSubmitted, setSubmited] = useState(false)

    const toast = useAppToast()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        watch,
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })
    //
    const reRef = useRef<ReCAPTCHA>(null)

    const onSubmit = handleSubmit(async (values) => {
        const token = (await reRef.current?.executeAsync()) || undefined
        if (!token) {
            toast(NotifyHelper.somethingWentWrong)
            return
        }
        const notBot = await isHuman(token)
        if (notBot) {
            const { firstName, lastName, email, password } = values
            try {
                await onSignUp({ firstName, lastName, email, password })
                reset()
                setSubmited(true)
            } catch (e) {}
        }
        reRef.current?.reset()
    })

    const isFormDisabled = isSubmitting || isSubmitted

    return (
        <Stack>
            {!isSubmitted ? (
                <>
                    <form onSubmit={onSubmit}>
                        <Stack>
                            <MyInput
                                autoFocus
                                required
                                field="firstName"
                                placeholder={'First name'}
                                label={'First name'}
                                register={register}
                                error={errors.firstName}
                                watch={watch}
                                showLabelRow={false}
                                isDisabled={isFormDisabled}
                            />
                            <MyInput
                                required
                                field="lastName"
                                placeholder={'Last name'}
                                label={'Last name'}
                                register={register}
                                error={errors.lastName}
                                watch={watch}
                                showLabelRow={false}
                                isDisabled={isFormDisabled}
                            />
                            <MyInput
                                required
                                field="email"
                                placeholder={'Email'}
                                type="email"
                                label={'Email'}
                                register={register}
                                error={errors.email}
                                watch={watch}
                                showLabelRow={false}
                                isDisabled={isFormDisabled}
                            />
                            <MyInput
                                type="password"
                                required
                                field="password"
                                placeholder={'Password'}
                                label={'Password'}
                                register={register}
                                error={errors.password}
                                watch={watch}
                                showLabelRow={false}
                                isDisabled={isFormDisabled}
                            />

                            <ReCAPTCHA
                                ref={reRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                size="invisible"
                            />
                            <Button
                                type="submit"
                                w="full"
                                colorScheme={'purple'}
                                disabled={!isDirty || isSubmitting}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                    <SignUpSupport />
                </>
            ) : (
                <UserVerificationForm />
            )}
        </Stack>
    )
}
