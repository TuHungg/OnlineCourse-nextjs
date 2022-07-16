import { useBreakpointValue } from '@chakra-ui/react'

export const useIsClientMobile = () => {
    return useBreakpointValue({ base: true, lg: false })
}
