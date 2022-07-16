import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../../../utils/constants/app-icon.constant'
import { usePermissionManagementParams } from '../../../../hooks/permission-management-url-params.hook'
import { useAppDialog } from '../../../../providers/app-dialog.provider'
import { usePermissionManagement } from '../../../../providers/permission-management.provider'
import AddNewRuleForm from '../AddNewPermissionRuleForm/AddNewRuleForm'
import { DOCUMENT_TYPE_FILTER_KEY } from './DocumentTypeFilter'
import { ROLE_FILTER_KEY } from './RoleFilter'

export interface AddNewRuleButtonProps extends ButtonProps {}
export const AddNewRuleButton = ({
    children,
    title = 'Add a new Rule',
    colorScheme = 'blue',
    ...props
}: AddNewRuleButtonProps) => {
    const { [ROLE_FILTER_KEY]: roleId, [DOCUMENT_TYPE_FILTER_KEY]: documentPermissionId } =
        usePermissionManagementParams()
    const {
        state: { role },
    } = usePermissionManagement()
    const { onShow } = useAppDialog()
    //
    const onClick = () => {
        let docPermissionId = documentPermissionId?.toString() || undefined
        onShow({
            title: 'Add New Rule',
            body: (
                <AddNewRuleForm
                    defaultValues={{
                        role: roleId?.toString() || undefined,
                        documentPermission: docPermissionId,
                    }}
                />
            ),
            size: 'md',
        })
    }
    return (
        <Button
            onClick={onClick}
            leftIcon={<Icon as={AppIcon.add} />}
            colorScheme={colorScheme}
            {...props}
        >
            {title}
        </Button>
    )
}
