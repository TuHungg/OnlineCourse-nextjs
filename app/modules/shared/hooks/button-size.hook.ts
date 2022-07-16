import { useBreakpointValue } from '@chakra-ui/react'
export const useButtonSize = () => {
    const size = useBreakpointValue(['sm', 'sm', 'md'])
    return size
}
