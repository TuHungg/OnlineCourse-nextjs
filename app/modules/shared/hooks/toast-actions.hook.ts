import { useAppToast } from './app-toast.hook'
import { useMemo, useCallback } from 'react'
import NotifyHelper from '../../../utils/helpers/notify.helper'
export const useToastActions = () => {
    const toast = useAppToast()
    const handleError = useCallback(
        (error: any) => {
            const errorObj = error.toJSON()
            switch (errorObj.status) {
                case 409:
                    toast(NotifyHelper.warning('Data already exist'))
                    break
                default:
                    toast(NotifyHelper.somethingWentWrong)
            }
        },
        [toast]
    )
    const result = useMemo(
        () => ({
            handleError,
        }),
        [handleError]
    )
    return result
}
