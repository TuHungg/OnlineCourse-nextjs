import { SearchItem } from '../../modules/admin/components/Search'
import FieldLabel from '../constants/field-label.constant'
import { TRoleSelectItem } from './data.type'

export const ROLE_STATUS_SELECT_DATA: TRoleSelectItem[] = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'inactive',
        label: 'In active',
    },
]

export const ROLE_SEARCH_MENU: SearchItem[] = [
    {
        title: FieldLabel.all,
        field: 'all',
    },
    {
        title: 'Name',
        field: 'name',
    },
]
