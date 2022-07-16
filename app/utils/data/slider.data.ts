import { SearchItem } from '../../modules/admin/components/Search'
import FieldLabel from '../constants/field-label.constant'
import { TSliderSelectItem } from './data.type'

export const SLIDER_STATUS_SELECT_DATA: TSliderSelectItem[] = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'inactive',
        label: 'In active',
    },
]

export const SLIDER_SEARCH_MENU: SearchItem[] = [
    {
        title: FieldLabel.all,
        field: 'all',
    },
    {
        title: 'Name',
        field: 'name',
    },
    {
        title: 'Description',
        field: 'description',
    },
]
//
