import { Badge, Button, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormMsg from '../../../../utils/constants/form-message.constant'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import PathHelper from '../../../../utils/helpers/path.helper'
import MyInput from '../../../shared/components/MyInput'
import { useClientToast } from '../../../shared/hooks/client-toast.hook'
import { useAuthParams } from '../../providers/auth-params.provider'
import { useAuth } from '../../providers/auth.provider'

interface FormData {
    email: string
    password: string
}

const vldSchema = yup.object({
    email: yup.string().email().required(FormMsg.required),
    password: yup.string().required(FormMsg.required),
})

export default function LoginForm() {
    const [formError, setFormError] = useState('')
    const {
        methods: { onLoginWithEmailAndPassword, isHuman },
    } = useAuth()
    const reRef = useRef<ReCAPTCHA>(null)

    //
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })
    const router = useRouter()
    const toast = useClientToast()
    const {
        state: { waitingRedirectPath },
    } = useAuthParams()
    //

    const onSubmit = handleSubmit(async (values) => {
        const token = (await reRef.current?.executeAsync()) || undefined
        if (!token) {
            toast(NotifyHelper.somethingWentWrong)
            return
        }
        const notBot = await isHuman(token)
        if (notBot) {
            const { email, password } = values
            try {
                await onLoginWithEmailAndPassword(email, password)
                const path = waitingRedirectPath || PathHelper.getClientPath()
                router.replace(path)
            } catch (e) {
                setFormError('Your credentials is invalid!')
                reset({ password: '' })
            }
        }
        reRef.current?.reset()
    })

    useEffect(() => {
        if (isDirty) setFormError('')
    }, [isDirty])
    return (
        <form onSubmit={onSubmit}>
            <Stack>
                {formError && <Badge colorScheme={'red'}>{formError}</Badge>}
                <MyInput
                    autoFocus
                    required
                    field="email"
                    type="email"
                    placeholder={'Email'}
                    label={'Email'}
                    register={register}
                    error={errors.email}
                    watch={watch}
                    showLabelRow={false}
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
                    Log In
                </Button>
            </Stack>
        </form>
    )
}
