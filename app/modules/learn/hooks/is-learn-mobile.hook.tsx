import { useBreakpointValue } from '@chakra-ui/react'

export const useIsLearnMobile = () => {
    return useBreakpointValue({ base: true, md: false })
}
