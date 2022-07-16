import { useBreakpointValue } from '@chakra-ui/react'

export const useIsInstructorMobile = () => {
    return useBreakpointValue({ base: true, lg: false })
}
