import { Button, ButtonGroup, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormMsg from '../../../../../../utils/constants/form-message.constant'
import NotifyHelper from '../../../../../../utils/helpers/notify.helper'
import MySelect from '../../../../../shared/components/MySelect'
import { useAppToast } from '../../../../../shared/hooks/app-toast.hook'
import { useToastActions } from '../../../../../shared/hooks/toast-actions.hook'
import { useUrlHelper } from '../../../../../shared/hooks/url-helper.hook'
import { ISelectItem } from '../../../../../shared/interfaces/select-data.interface'
import { useAppDialog } from '../../../../providers/app-dialog.provider'
import { useDocumentPermissionSelectDataQuery } from '../../../../queries/document-permission-query.hook'
import {
    useAddRolePermission,
    useRolePermissionsQuery,
} from '../../../../queries/role-permissions-query.hook'
import { useRoleSelectDataQuery } from '../../../../queries/role-select-data-query.hook'
import { DOCUMENT_TYPE_FILTER_KEY } from '../PermissionToolbar/DocumentTypeFilter'
import { ROLE_FILTER_KEY } from '../PermissionToolbar/RoleFilter'

type FormData = {
    documentPermission: string
    role: string
}

const vldSchema = yup.object({
    documentPermission: yup.string().required(FormMsg.required),
    role: yup.string().required(FormMsg.required),
})
export interface AddNewRuleFormProps {
    defaultValues?: Partial<FormData>
}
export default function AddNewRuleForm(props: AddNewRuleFormProps) {
    const toast = useAppToast()
    const { handleError } = useToastActions()
    const { data: documentPermissionData } = useDocumentPermissionSelectDataQuery()
    const { data: roleSD } = useRoleSelectDataQuery()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
        defaultValues: props.defaultValues,
    })
    const { data: rolePermissions } = useRolePermissionsQuery(watch('role'))
    const documentPermissionSD = useMemo(() => {
        const rolePermissionIds = rolePermissions?.map((item) => item.documentPermission._id)
        const data = documentPermissionData?.filter(
            (item) => !rolePermissionIds?.includes(item.value)
        )
        return data
    }, [documentPermissionData, rolePermissions])
    const { getUrlWithQueryParams } = useUrlHelper()
    const router = useRouter()

    const { onClose } = useAppDialog()
    const { mutate: addRolePermission } = useAddRolePermission()

    //
    const onSubmit = handleSubmit(async (values) => {
        addRolePermission(
            { roleId: values.role, documentPermissionId: values.documentPermission },
            {
                onSuccess: () => {
                    const url = getUrlWithQueryParams({
                        [ROLE_FILTER_KEY]: values.role,
                        [DOCUMENT_TYPE_FILTER_KEY]: '',
                    })
                    toast(NotifyHelper.success('New Rule added'))
                    router.push(url)
                    onClose()
                },
                onError: handleError,
            }
        )
    })
    return (
        <form onSubmit={onSubmit}>
            <Stack pt={5}>
                <MySelect
                    required
                    placeholder={'Select Document Type'}
                    field="documentPermission"
                    label={'Document Type'}
                    register={register}
                    error={errors.documentPermission}
                    options={documentPermissionSD}
                />
                <MySelect
                    required
                    placeholder={'Select Role'}
                    field="role"
                    label={'Role'}
                    register={register}
                    error={errors.role}
                    options={roleSD}
                />
                <ButtonGroup justifyContent={'end'}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button colorScheme={'blue'} type="submit" disabled={isSubmitting}>
                        Add
                    </Button>
                </ButtonGroup>
            </Stack>
        </form>
    )
}
