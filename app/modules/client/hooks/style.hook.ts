import { useTheme } from '@chakra-ui/react'

export const useActiveColor = () => {
    const theme = useTheme()
    const color = theme.colors.purple[500]
    return color
}
