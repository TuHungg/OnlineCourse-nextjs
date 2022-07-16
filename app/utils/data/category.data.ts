import { SearchItem } from '../../modules/admin/components/Search';
import FieldLabel from '../constants/field-label.constant';
import { TCategorySelectItem, TUserSelectItem } from './data.type';

export const CATEGORY_STATUS_SELECT_DATA: TCategorySelectItem[] = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'inactive',
        label: 'In active',
    },
]


export const CATEGORY_SEARCH_MENU: SearchItem[] = [
    {
        title: FieldLabel.all,
        field: 'all',
    },
    {
        title: 'Name',
        field: 'name',
    },
]

