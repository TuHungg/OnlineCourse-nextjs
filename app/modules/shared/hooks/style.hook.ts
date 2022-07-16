import { useColorModeValue, useTheme } from '@chakra-ui/react'
import { DEFAULT_DARK_BACKGROUND } from '../../../theme/index'
import { TColorScheme } from './../types/color-scheme.type'
// colors
export const useCardBg = () => {
    return useColorModeValue('white', 'gray.700')
}
export const useAppBg = () => {
    return useColorModeValue('gray.50', DEFAULT_DARK_BACKGROUND)
}
export const useHoverColor = () => {
    return useColorModeValue('gray.100', 'gray.700')
}
export const useBorderColor = () => {
    return useColorModeValue('gray.300', 'gray.700')
}
export const useSubtitleColor = () => {
    return useColorModeValue('gray', 'gray.500')
}
export const useMutedColor = () => {
    return useColorModeValue('#A1A5B7', '#A1A5B7')
}
export const useDefaultColor = () => {
    return useColorModeValue('black', 'white')
}

export const useIColor = () => {
    return useColorModeValue('white', 'black')
}

export const useDefaultBg = () => {
    return useColorModeValue('white', 'gray.800')
}
export const useDarkBg = () => {
    return useColorModeValue('gray.800', 'teal.300')
}

export const useIBg = () => {
    return useColorModeValue('gray.800', 'white')
}
// COURSE FORM
export const useCurriculumFormBg = () => {
    return useColorModeValue('white', 'gray.900')
}

export const useColors = (): TColorScheme => {
    const theme = useTheme()
    const colors = theme.colors
    return colors
}
