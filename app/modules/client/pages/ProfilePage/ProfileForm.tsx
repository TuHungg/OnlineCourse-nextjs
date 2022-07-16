import { Button, GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'
import { apiEditProfile } from '../../../../apis/user/user.api'
import FieldLabel from '../../../../utils/constants/field-label.constant'
import { AVATAR_DIR } from '../../../../utils/constants/firebase.constant'
import FormMsg from '../../../../utils/constants/form-message.constant'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import { useAuth } from '../../../auth/providers/auth.provider'
import { RQK_AUTH_USER } from '../../../auth/queries/auth-user-query.hook'
import EditableAvatar from '../../../shared/components/EditableAvatar'
import MyInput from '../../../shared/components/MyInput'
import MyProgressBar from '../../../shared/components/MyProgress'
import { useAppToast } from '../../../shared/hooks/app-toast.hook'
import { useUploadImage } from '../../../shared/hooks/upload-image.hook'
import { IProfile, IUser } from '../../../shared/interfaces/models/user.interface'

type FormData = {
    firstName: string
    lastName: string
    avatar: string
    phone?: string
    address?: string
}

const ProfileForm = () => {
    const {
        state: { user },
    } = useAuth()

    const [isAvatarChanged, setAvatarChanged] = useState(false)
    const queryClient = useQueryClient()
    const toast = useAppToast()
    //
    const [item, setItem] = useState<IProfile>()

    // const [initialValues, setInitialValues] = useState<FormData>()
    const { handleUpload, uploadProgress, getImgSrcFuncRef } = useUploadImage(
        AVATAR_DIR,
        item?.avatar
    )
    const initialValues = yup.object({
        firstName: yup.string().required(FormMsg.required),
        lastName: yup.string().required(FormMsg.required),
        avatar: yup.string().nullable(),
        phone: yup.string().nullable(),
        address: yup.string().nullable(),
    })

    // FORM HOOKS
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(initialValues),
    })

    // FORM TYPE
    useEffect(() => {
        const values: FormData = {
            firstName: user?.profile.firstName || '',
            lastName: user?.profile.lastName || '',
            avatar: user?.profile.avatar || '',
            phone: user?.profile.phone,
            address: user?.profile.address,
        }
        setItem(user?.profile)
        reset(values)
    }, [reset, user?.profile])

    // ON SUBMIT
    const onSubmit = handleSubmit(async (values) => {
        handleUpload(async (_, imgSrc) => {
            const data: Partial<IUser> = {
                profile: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    avatar: imgSrc,
                    phone: values.phone,
                    address: values.address,
                } as IProfile,
            }
            try {
                const result = await apiEditProfile(data)
                setItem(result.profile)
                queryClient.invalidateQueries(RQK_AUTH_USER)
                toast(NotifyHelper.success('Profile updated'))
                setAvatarChanged(false)
                reset(values)
            } catch (err) {
                console.error(err)
            }
        })
    })
    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={4}>
                <Stack>
                    <EditableAvatar
                        setAvatarChanged={setAvatarChanged}
                        getImgSrcFuncRef={getImgSrcFuncRef}
                        field="avatar"
                        label={FieldLabel['user.avatar']}
                        initialSrc={item?.avatar}
                    />

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                        <GridItem colSpan={1}>
                            <MyInput
                                required
                                field="firstName"
                                label={FieldLabel['user.firstName']}
                                register={register}
                                error={errors.firstName}
                                autoFocus
                            />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <MyInput
                                required
                                field="lastName"
                                label={FieldLabel['user.lastName']}
                                register={register}
                                error={errors.lastName}
                            />
                        </GridItem>
                    </SimpleGrid>
                    <SimpleGrid columns={1} spacing={2}>
                        <GridItem
                            colSpan={{
                                base: 2,
                                md: 1,
                            }}
                        ></GridItem>
                        <GridItem
                            colSpan={{
                                base: 2,
                                md: 1,
                            }}
                        >
                            <MyInput
                                field="phone"
                                label={FieldLabel['user.phone']}
                                register={register}
                                error={errors.phone}
                            />
                        </GridItem>
                    </SimpleGrid>

                    <MyInput
                        field="address"
                        label={FieldLabel['user.address']}
                        register={register}
                        error={errors.address}
                    />

                    {/* == */}
                    {uploadProgress && <MyProgressBar value={uploadProgress} />}
                </Stack>
                <Button
                    colorScheme={'blue'}
                    type="submit"
                    disabled={!isAvatarChanged && (!isDirty || isSubmitting)}
                >
                    Submit
                </Button>
            </Stack>
        </form>
    )
}

export default ProfileForm
