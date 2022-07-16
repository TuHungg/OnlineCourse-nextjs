import { SearchItem } from '../../modules/admin/components/Search'
import FieldLabel from '../constants/field-label.constant'

export const ACTIVITY_LOGS_SEARCH_MENU: SearchItem[] = [
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
    {
        title: 'Route',
        field: 'content',
    },
]
//
