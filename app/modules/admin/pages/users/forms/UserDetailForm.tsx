import { Button, ButtonGroup, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchById } from '../../../../../apis/acp/admin.api'
import FieldLabel from '../../../../../utils/constants/field-label.constant'
import { AVATAR_DIR } from '../../../../../utils/constants/firebase.constant'
import lan from '../../../../../utils/constants/lan.constant'
import { USER_STATUS_SELECT_DATA } from '../../../../../utils/data/user.data'
import Helper from '../../../../../utils/helpers/helper.helper'
import { userVldSchema } from '../../../../../validations/user.validation'
import EditableAvatar from '../../../../shared/components/EditableAvatar'
import MyCircularProgress from '../../../../shared/components/MyCircularProgress'
import MyInput from '../../../../shared/components/MyInput'
import MyProgressBar from '../../../../shared/components/MyProgress'
import MySelect from '../../../../shared/components/MySelect'
import { useCrudActions } from '../../../../shared/hooks/data/crud-actions.hook'
import { useUploadImage } from '../../../../shared/hooks/upload-image.hook'
import IRole from '../../../../shared/interfaces/models/role.interface'
import { IProfile, IUser } from '../../../../shared/interfaces/models/user.interface'
import { useAppDialog } from '../../../providers/app-dialog.provider'
import { usePageParams } from '../../../providers/page-params.provider'
import { useRoleSelectDataQuery } from '../../../queries/role-select-data-query.hook'

export interface UserDetailFormProps {
    userId?: string
    onUserCreated?: () => void
}

type FormData = {
    _id?: string
    firstName: string
    lastName: string
    email: string
    password?: string
    passwordConfirm?: string
    role: string
    status: string
    phone?: string
    address?: string
}

export default function UserDetailForm({ userId, onUserCreated }: UserDetailFormProps) {
    const { ctrlName } = usePageParams()

    const { onCreate, onUpdate } = useCrudActions()
    const { onClose } = useAppDialog()
    const { data: roleSD } = useRoleSelectDataQuery()
    //
    const [isAvatarChanged, setAvatarChanged] = useState(false)
    const [formType, setFormType] = useState<'add' | 'edit'>('add')
    const [loading, setLoading] = useState<boolean>(true)
    const [item, setItem] = useState<IUser>()
    const [initialValues, setInitialValues] = useState<FormData>()
    const { handleUpload, uploadProgress, getImgSrcFuncRef } = useUploadImage(
        AVATAR_DIR,
        item?.profile.avatar
    )

    // FORM HOOKS
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(userVldSchema(initialValues as any)),
    })

    // FORM TYPE
    useEffect(() => {
        if (userId) {
            setFormType('edit')
            fetchById<IUser>('users', userId).then((item) => {
                const values: FormData = {
                    _id: item._id,
                    firstName: item.profile.firstName,
                    lastName: item.profile.lastName,
                    email: item.email,
                    role: (item.role as IRole)._id,
                    status: item.status,
                    phone: item.profile.phone,
                    address: item.profile.address,
                }
                setItem(item)
                setInitialValues(values)
                reset(values)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlName, userId])

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
                email: values.email,
                password: values.password ? Helper.md5(values.password) : undefined,
                role: values.role as any,
                status: values.status,
            }
            if (formType == 'add') {
                await onCreate(data)
                onUserCreated && onUserCreated()
                onClose()
            } else {
                const updatedItem = await onUpdate(item!._id, data)
                if (updatedItem) {
                    setItem(updatedItem)
                    setInitialValues(values)
                    setAvatarChanged(false)
                    reset(values)
                }
            }
        })
    })

    return (
        <>
            {!loading ? (
                <form onSubmit={onSubmit}>
                    <VStack align="stretch" spacing={10}>
                        <VStack align="stretch" spacing={4}>
                            <EditableAvatar
                                setAvatarChanged={setAvatarChanged}
                                getImgSrcFuncRef={getImgSrcFuncRef}
                                field="avatar"
                                label={FieldLabel['user.avatar']}
                                initialSrc={item?.profile.avatar}
                            />
                            <SimpleGrid columns={2} spacing={2}>
                                <GridItem
                                    colSpan={{
                                        base: 2,
                                        md: 1,
                                    }}
                                >
                                    <MyInput
                                        required
                                        field="firstName"
                                        label={FieldLabel['user.firstName']}
                                        register={register}
                                        error={errors.firstName}
                                        autoFocus
                                    />
                                </GridItem>
                                <GridItem
                                    colSpan={{
                                        base: 2,
                                        md: 1,
                                    }}
                                >
                                    <MyInput
                                        required
                                        field="lastName"
                                        label={FieldLabel['user.lastName']}
                                        register={register}
                                        error={errors.lastName}
                                    />
                                </GridItem>
                            </SimpleGrid>
                            <SimpleGrid columns={2} spacing={2}>
                                <GridItem
                                    colSpan={{
                                        base: 2,
                                        md: 1,
                                    }}
                                >
                                    <MyInput
                                        required
                                        type="email"
                                        field="email"
                                        label={FieldLabel['user.email']}
                                        register={register}
                                        error={errors.email}
                                    />
                                </GridItem>
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

                            <SimpleGrid columns={2} spacing={2}>
                                <GridItem
                                    colSpan={{
                                        base: 2,
                                        md: 1,
                                    }}
                                >
                                    <MyInput
                                        required
                                        field="password"
                                        label={FieldLabel['user.password']}
                                        register={register}
                                        error={errors.password}
                                        type="password"
                                    />
                                </GridItem>
                                <GridItem
                                    colSpan={{
                                        base: 2,
                                        md: 1,
                                    }}
                                >
                                    <MyInput
                                        field="passwordConfirm"
                                        label={FieldLabel['user.passwordConfirm']}
                                        register={register}
                                        error={errors.passwordConfirm}
                                        type="password"
                                    />
                                </GridItem>
                            </SimpleGrid>
                            <SimpleGrid columns={2} spacing={2}>
                                <GridItem
                                    colSpan={{
                                        base: 2,
                                        md: 1,
                                    }}
                                >
                                    <MySelect
                                        required
                                        placeholder={`${Helper.lodash.upperFirst(lan.SELECT)} ${
                                            FieldLabel['user.status']
                                        }`}
                                        field="status"
                                        label={FieldLabel['user.status']}
                                        register={register}
                                        error={errors.status}
                                        options={USER_STATUS_SELECT_DATA}
                                    />
                                </GridItem>
                                <GridItem
                                    colSpan={{
                                        base: 2,
                                        md: 1,
                                    }}
                                >
                                    <MySelect
                                        required
                                        placeholder={`${Helper.lodash.upperFirst(lan.SELECT)} ${
                                            FieldLabel['user.role']
                                        }`}
                                        field="role"
                                        label={FieldLabel['user.role']}
                                        register={register}
                                        error={errors.role}
                                        options={roleSD}
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
                        </VStack>
                        <ButtonGroup justifyContent={'end'}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                colorScheme={'blue'}
                                type="submit"
                                disabled={!isAvatarChanged && (!isDirty || isSubmitting)}
                            >
                                Submit
                            </Button>
                        </ButtonGroup>
                    </VStack>
                </form>
            ) : (
                <HStack justify={'center'}>
                    <MyCircularProgress />
                </HStack>
            )}
        </>
    )
}
