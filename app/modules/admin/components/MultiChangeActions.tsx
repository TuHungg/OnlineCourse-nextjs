import { Button, HStack, Text, useQuery } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectMultiChangeIds, selectSelectedQty } from '../../../store/admin/multi-change.slice'
import lan from '../../../utils/constants/lan.constant'
import Helper from '../../../utils/helpers/helper.helper'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import IActionItem from '../../shared/interfaces/action-item.inteface'
import { usePageParams } from '../providers/page-params.provider'

export interface MultiChangeActions {
    actions?: IActionItem[]
    onMultiDelete?: () => void
}

export default function MultiChangeActions({ actions, onMultiDelete }: MultiChangeActions) {
    const { onDeleteMany } = useCrudActions()
    const selectedQty = useSelector(selectSelectedQty)
    const selectIds = useSelector(selectMultiChangeIds)
    const actionsHtml = actions?.map((item) => {
        return (
            <Button key={item.name} onClick={item.onClick} colorScheme={item.colorScheme || 'gray'}>
                {item.name}
            </Button>
        )
    })
    const onDelete = useCallback(() => {
        selectIds &&
            onDeleteMany(selectIds, {
                onSuccess: () => {
                    onMultiDelete && onMultiDelete()
                },
            })
    }, [onDeleteMany, onMultiDelete, selectIds])
    return (
        <HStack spacing={4} justify="flex-end">
            <Text as="strong">
                {selectedQty} {Helper.lodash.capitalize(lan.SELECTED)}
            </Text>
            <HStack>
                {actionsHtml ? (
                    actionsHtml
                ) : (
                    <Button onClick={onDelete} colorScheme={'red'}>
                        {Helper.lodash.capitalize(lan.DELETE_SELECTED)}
                    </Button>
                )}
            </HStack>
        </HStack>
    )
}
