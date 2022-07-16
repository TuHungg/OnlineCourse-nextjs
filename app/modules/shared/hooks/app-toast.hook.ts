import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useAppToast = (options?: UseToastOptions) => {
    const toast = useToast({
        position: 'bottom-right',
        isClosable: true,
        ...options,
    })
    return toast
}
