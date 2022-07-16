import { useBreakpointValue } from '@chakra-ui/react'

export const useIsCourseFormMobile = () => {
    return useBreakpointValue({ base: true, xl: false })
}
