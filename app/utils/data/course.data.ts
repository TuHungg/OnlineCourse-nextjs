import { SearchItem } from '../../modules/admin/components/Search'
import { ISelectItem } from '../../modules/shared/interfaces/select-data.interface'
import FieldLabel from '../constants/field-label.constant'
import { TCourseSelectItem } from './data.type'

export const COURSE_LEVEL_SELECT_DATA: ISelectItem<string>[] = [
    {
        value: 'beginner',
        label: 'Beginner level',
    },
    {
        value: 'intermediate',
        label: 'Intermediate level',
    },
    {
        value: 'expert',
        label: 'Expert level',
    },
    {
        value: 'all',
        label: 'All level',
    },
]

export const COURSE_CURRENCY_SELECT_DATA: ISelectItem<string>[] = [
    {
        value: 'usd',
        label: 'USD',
    },
    {
        value: 'vnd',
        label: 'VND',
    },
]
export const COURSE_PRICE_TIER_DATA: Record<string, ISelectItem<number>[]> = {
    vnd: [
        {
            value: 299000,
            label: '299.000 (tier 1)',
        },
        {
            value: 399000,
            label: '399.000 (tier 3)',
        },
        {
            value: 499000,
            label: '499.000 (tier 3)',
        },
    ],
    usd: [
        {
            value: 0,
            label: 'Free',
        },
        {
            value: 19.99,
            label: '19.99 (tier 1)',
        },
        {
            value: 24.99,
            label: '24.99 (tier 3)',
        },
        {
            value: 29.99,
            label: '29.99 (tier 3)',
        },
    ],
}
export const COURSE_LAN_SELECT_DATA: ISelectItem<string>[] = [
    {
        value: 'vi',
        label: 'Vietnamese',
    },
    {
        value: 'en',
        label: 'English',
    },
]

export const COURSE_STATUS_SELECT_DATA: TCourseSelectItem[] = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'rejected',
        label: 'Rejected',
    },
    {
        value: 'draft',
        label: 'Draft',
    },
    {
        value: 'pending',
        label: 'Pending',
    },
]

export const COURSE_SEARCH_MENU: SearchItem[] = [
    {
        title: FieldLabel.all,
        field: 'all',
    },
    {
        title: FieldLabel['course.title'],
        field: 'title',
    },
]
