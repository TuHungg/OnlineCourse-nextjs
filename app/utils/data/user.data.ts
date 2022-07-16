import { SearchItem } from '../../modules/admin/components/Search'
import FieldLabel from '../constants/field-label.constant'
import { TUserSelectItem } from './data.type'

export const USER_STATUS_SELECT_DATA: TUserSelectItem[] = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'inactive',
        label: 'In active',
    },
    {
        value: 'unverified',
        label: 'Unverified',
    },
    {
        value: 'block',
        label: 'Block',
    },
]

export const USER_SEARCH_MENU: SearchItem[] = [
    {
        title: FieldLabel.all,
        field: 'all',
    },
    {
        title: FieldLabel['user.email'],
        field: 'email',
    },
    {
        title: FieldLabel['user.fullName'],
        field: 'profile.fullName',
    },
]
//
