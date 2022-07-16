import { ButtonGroup } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useDocumentPermissionSelectDataQuery } from '../../../../queries/document-permission-query.hook'
import { useRoleSelectDataQuery } from '../../../../queries/role-select-data-query.hook'
import { AddNewRuleButton } from './AddNewRuleButton'

export const PermissionActions = () => {
    return (
        <ButtonGroup justifyContent="end">
            <AddNewRuleButton />
        </ButtonGroup>
    )
}
