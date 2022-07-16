import {
    Alert,
    Button,
    ButtonGroup,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { apiForgotPassword } from '../../../apis/auth.api'
import AppMsg from '../../../utils/constants/app-messsage.constant'
import NotifyHelper from '../../../utils/helpers/notify.helper'
import CancelButton from '../../shared/components/CancelButton'
import MyInput from '../../shared/components/MyInput'
import SubmitButton from '../../shared/components/SubmitButton'
import { useAppToast } from '../../shared/hooks/app-toast.hook'
import { useAuth } from '../providers/auth.provider'

interface FormData {
    email: string
}
const vldSchema = yup.object({
    email: yup.string().email(),
})

const CheckInboxNotification = ({ onClose }: { onClose: () => void }) => {
    return (
        <Stack>
            <Alert status="info">
                {`Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.`}
            </Alert>
            <HStack justify={'end'}>
                <CancelButton colorScheme={'teal'} onClick={onClose}>
                    Got it
                </CancelButton>
            </HStack>
        </Stack>
    )
}

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })
    const [isSubmitted, setSubmitted] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        methods: { isHuman },
    } = useAuth()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const reRef = React.useRef<ReCAPTCHA>(null)
    const toast = useAppToast()

    const onSubmit = handleSubmit(async (values) => {
        const token = reRef.current!.getValue()
        if (!token) {
            toast(NotifyHelper.warning(AppMsg.PLEASE_CONFIRM_RECAPTCHA))
            return
        }
        const notBot = await isHuman(token)

        if (notBot) {
            try {
                apiForgotPassword(values.email)
                setSubmitted(true)
                reset()
            } catch (error) {
                console.error(error)
            }
        }
        reRef.current?.reset()
    })

    const onModalClose = () => {
        reset(undefined)
        setSubmitted(false)
        onClose()
    }

    return (
        <>
            <Button size="sm" colorScheme={'purple'} variant={'link'} onClick={onOpen}>
                Forgot Password
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onModalClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Forgot Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {!isSubmitted ? (
                            <form onSubmit={onSubmit}>
                                <Stack spacing={4}>
                                    <Stack>
                                        <Text>
                                            {`Enter your email address below and we'll send you a link
                                            to reset your password.`}
                                        </Text>
                                        <MyInput
                                            required
                                            field="email"
                                            label={'Email'}
                                            placeholder="Your email"
                                            showLabelRow={false}
                                            register={register}
                                            error={errors.email}
                                            autoFocus
                                        />
                                        <ReCAPTCHA
                                            ref={reRef}
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                            size="normal"
                                        />
                                    </Stack>
                                    <ButtonGroup justifyContent={'end'}>
                                        <CancelButton onClick={onClose} />
                                        <SubmitButton disabled={!isDirty || isSubmitting} />
                                    </ButtonGroup>
                                </Stack>
                            </form>
                        ) : (
                            <CheckInboxNotification onClose={onModalClose} />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ForgotPassword
