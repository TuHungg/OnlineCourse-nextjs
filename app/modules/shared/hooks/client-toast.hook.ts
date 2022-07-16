import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useClientToast = (options?: UseToastOptions) => {
    const toast = useToast({
        position: 'bottom-right',
        ...options,
    })
    return toast
}
