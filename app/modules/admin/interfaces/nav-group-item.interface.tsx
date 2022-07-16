import { IconType } from 'react-icons'
import { IAdminNavItem } from './admin-nav-item.interface'

export interface INavGroupItem {
    title: string
    icon: IconType
    navItems: IAdminNavItem[]
}
