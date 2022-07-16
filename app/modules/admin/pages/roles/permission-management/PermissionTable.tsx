import {
    Alert,
    AlertIcon,
    Checkbox,
    GridItem,
    HStack,
    Icon,
    IconButton,
    SimpleGrid,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import update from 'immutability-helper'
import lodash from 'lodash'
import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import lan from '../../../../../utils/constants/lan.constant'
import { PERMISSION, TPermission } from '../../../../../utils/constants/role.constant'
import NotifyHelper from '../../../../../utils/helpers/notify.helper'
import LoadingMessageTr from '../../../../shared/components/LoadingMessageTr'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import { IRolePermission } from '../../../../shared/interfaces/models/role.interface'
import { usePermissionManagement } from '../../../providers/permission-management.provider'
import { useSimpleDialog } from '../../../providers/simple-dialog.provider'
import {
    useDeleteRolePermission,
    useRolePermissionsQuery,
    useUpdateRolePermission,
} from '../../../queries/role-permissions-query.hook'
import { AddNewRuleButton } from './PermissionToolbar/AddNewRuleButton'

const Row = ({ item: rolePermission }: { item: IRolePermission }) => {
    const toast = useAppToast()
    const {
        state: { role },
        methods: { setRuleChanged },
    } = usePermissionManagement()
    const [enabledPermissionForm, setEnabledPermissionForm] = useState<TPermission[]>(
        rolePermission.enabledPermissions
    )
    const simpleDialog = useSimpleDialog()
    const [onlyForCreator, setOnlyForCreator] = useState<boolean>(rolePermission.onlyForCreator)
    const { mutate: updateRolePermission } = useUpdateRolePermission()
    const { mutate: deleteRolePermission } = useDeleteRolePermission()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateRolePermissionDebounce = useCallback(
        lodash.debounce(
            (roleId: string, documentPermissionId: string, enabledPermissions: TPermission[]) => {
                updateRolePermission(
                    {
                        roleId,
                        documentPermissionId,
                        data: { enabledPermissions },
                    },
                    {
                        onSuccess: () => {
                            setRuleChanged(true)
                            toast(NotifyHelper.success('Role permission updated'))
                        },
                        onError: () => {
                            toast(NotifyHelper.somethingWentWrong)
                        },
                    }
                )
            },
            1000
        ),
        []
    )

    // ENABLED PERMISSION CHANGED => UPDATE
    useEffect(() => {
        if (
            !!role?._id &&
            !lodash.isEqual(enabledPermissionForm, rolePermission.enabledPermissions)
        ) {
            // update
            updateRolePermissionDebounce(
                role._id,
                rolePermission.documentPermission._id,
                enabledPermissionForm
            )
        }
    }, [
        enabledPermissionForm,
        role?._id,
        rolePermission.documentPermission._id,
        rolePermission.enabledPermissions,
        updateRolePermissionDebounce,
    ])

    // ONLY FOR CREATOR CHANGED => UPDATE
    useEffect(() => {
        if (!!role?._id && rolePermission.onlyForCreator != onlyForCreator) {
            updateRolePermission({
                roleId: role._id,
                documentPermissionId: rolePermission.documentPermission._id,
                data: {
                    onlyForCreator: onlyForCreator,
                },
            })
        }
    }, [
        onlyForCreator,
        role?._id,
        rolePermission.documentPermission._id,
        rolePermission.onlyForCreator,
        updateRolePermission,
    ])
    //
    const renderPermission = useCallback(
        (item: TPermission, i: number) => {
            const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
                setEnabledPermissionForm((enabledPermissionForm) => {
                    const checked = e.target.checked
                    if (checked) {
                        return update(enabledPermissionForm, {
                            $push: [item],
                        })
                    }
                    const idx = enabledPermissionForm.indexOf(item)
                    return update(enabledPermissionForm, {
                        $splice: [[idx, 1]],
                    })
                })
            }
            const checked = rolePermission.enabledPermissions.includes(item)
            return (
                <GridItem key={item} colSpan={1}>
                    <Checkbox onChange={onChange} defaultChecked={checked}>
                        {lodash.upperFirst(PERMISSION[item])}
                    </Checkbox>
                </GridItem>
            )
        },
        [rolePermission.enabledPermissions]
    )

    const onOnlyForCreatorChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const checked = e.target.checked
        setOnlyForCreator(checked)
    }

    const onDelete = () => {
        simpleDialog.onShow({
            title: `Delete ${rolePermission.documentPermission.name} rule?`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                deleteRolePermission(
                    {
                        roleId: role?._id!,
                        documentPermissionId: rolePermission.documentPermission._id,
                    },
                    {
                        onSuccess: () => {
                            toast(NotifyHelper.success('Rule deleted'))
                        },
                    }
                )
            },
        })
    }

    return (
        <Tr>
            <Td py={5} verticalAlign={'top'}>
                {rolePermission.documentPermission.name}
            </Td>
            <Td py={5} verticalAlign={'top'}>
                <Stack spacing={4}>
                    <Text>{role?.name}</Text>
                    {rolePermission.documentPermission.type == 'document' ? (
                        <Checkbox onChange={onOnlyForCreatorChange} defaultChecked={onlyForCreator}>
                            Only for creator
                        </Checkbox>
                    ) : null}
                </Stack>
            </Td>
            <Td py={5}>
                <SimpleGrid columns={3} spacingY={4}>
                    {rolePermission.documentPermission.permissions.map(renderPermission)}
                </SimpleGrid>
            </Td>
            <Td>
                <IconButton
                    onClick={onDelete}
                    size="sm"
                    aria-label=""
                    icon={<Icon as={AppIcon.x} />}
                />
            </Td>
        </Tr>
    )
}

function PermissionTable() {
    const {
        state: { documentPermissionId, role },
    } = usePermissionManagement()
    const { isLoading, data } = useRolePermissionsQuery(role?._id, documentPermissionId)

    const renderRow = useCallback((item: IRolePermission, i: number) => {
        return <Row key={item._id} item={item} />
    }, [])
    const renderContent = useMemo(() => {
        if (isLoading) {
            return <LoadingMessageTr />
        } else if (!!data && data.length > 0) {
            return data.map(renderRow)
        } else {
            return !!role?._id ? (
                <Tr>
                    <Td colSpan={1000}>
                        <Stack>
                            <Alert status="info" textAlign={'center'}>
                                <AlertIcon />
                                <HStack spacing={4}>
                                    <Text>No rule for current criteria</Text>
                                    <AddNewRuleButton size="sm" w="fit-content" />
                                </HStack>
                            </Alert>
                        </Stack>
                    </Td>
                </Tr>
            ) : null
        }
    }, [data, isLoading, renderRow, role?._id])

    return (
        <Stack spacing={4}>
            <TableContainer minH={'300px'}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Document Type</Th>
                            <Th>Role</Th>
                            <Th minW="60%">Permissions</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>{renderContent}</Tbody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

export default React.memo(PermissionTable)
