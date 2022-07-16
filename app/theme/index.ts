import { ThemeConfig, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const DEFAULT_LIGHT_BACKGROUND = 'white'
export const DEFAULT_DARK_BACKGROUND = 'gray.800'
const config: ThemeConfig = {}
const theme = extendTheme({
    colors: {
        whiteSmoke: {
            500: '#e0e0e0',
        },
        rating: {
            500: '#E59819',
        },
    },
    config,
    styles: {
        global: (props: any) => ({
            body: {
                bg: mode(DEFAULT_LIGHT_BACKGROUND, DEFAULT_DARK_BACKGROUND)(props),
            },
        }),
    },
})
export default theme
