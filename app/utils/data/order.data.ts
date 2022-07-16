import { SearchItem } from '../../modules/admin/components/Search'
import FieldLabel from '../constants/field-label.constant'

export const ORDER_SEARCH_MENU: SearchItem[] = [
    {
        title: FieldLabel.all,
        field: 'all',
    },
    {
        title: 'Order Id',
        field: '_id',
    },
    {
        title: 'Customer Name',
        field: 'history.createdBy.profile.fullName',
    },
    {
        title: 'Customer Email',
        field: 'history.createdBy.email',
    },
]
