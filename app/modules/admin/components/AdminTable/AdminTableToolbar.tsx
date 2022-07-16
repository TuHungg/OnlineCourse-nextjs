import { BoxProps, Flex, Stack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedQty } from '../../../../store/admin/multi-change.slice'
import IActionItem from '../../../shared/interfaces/action-item.inteface'
import { FilterItemProps } from '../Filter/FilterItem'
import MultiChangeActions from '../MultiChangeActions'
import Search, { SearchItem } from '../Search'

export interface AdminTableToolbarProps extends BoxProps {
    searchMenu?: SearchItem[],
    multiChangeActions?: IActionItem[]
    actions?: ReactNode[]
    onMultiDelete?: () => void
}

const AdminTableToolbar = ({ searchMenu, actions, multiChangeActions, onMultiDelete, ...props }: AdminTableToolbarProps) => {
    const selectedQty = useSelector(selectSelectedQty);
    return (
        <Stack
            align={{
                base: 'stretch',
                lg: 'center'
            }}
            flexDir={{
                base: 'column',
                lg: 'row'
            }}
            justify={{
                base: undefined,
                lg: 'space-between'
            }}
            {...props}
        >
            {/* SEARCH */}
            {searchMenu && <Search searchMenu={searchMenu} defaultField={'all'} />}
            {
                selectedQty == 0
                    ? <OtherActions actions={actions} />
                    : <MultiChangeActions onMultiDelete={onMultiDelete} actions={multiChangeActions} />
            }
        </Stack>
    )
}

export default React.memo(AdminTableToolbar);

function OtherActions({ actions }: {
    filters?: FilterItemProps[],
    actions?: ReactNode[]
}) {
    return <Flex
        gap={{ base: 2, lg: 4 }}
        align='center'
        justify={{
            base: 'end',
            lg: undefined
        }}
    >
        {actions}
    </Flex>
}
