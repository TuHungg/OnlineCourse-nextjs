import { IconType } from 'react-icons'
import { TColorScheme } from '../types/color-scheme.type'

export default interface IActionItem {
    name: string
    icon?: IconType
    colorScheme?: TColorScheme
    onClick?: () => void
    path?: string
}
