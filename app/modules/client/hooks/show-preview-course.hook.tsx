import { useMediaQuery } from '@chakra-ui/react'
import { useIsMounted } from '../../shared/hooks/app.hook'

export const useShowPreviewCourse = () => {
    const mounted = useIsMounted()
    const [show] = useMediaQuery('(min-width: 1420px)')
    return mounted && show
}
