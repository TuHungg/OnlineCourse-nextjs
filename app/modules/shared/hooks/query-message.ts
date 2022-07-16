import { useRouter } from 'next/router'
import { useCallback } from 'react'
import AppMsg from '../../../utils/constants/app-messsage.constant'
import lan from '../../../utils/constants/lan.constant'
import NotifyHelper from '../../../utils/helpers/notify.helper'
import UrlHelper from '../../../utils/helpers/url.heper'
import { useClientToast } from './client-toast.hook'

export const useQueryMessage = () => {
    const router = useRouter()
    const { messageType } = router.query
    const toast = useClientToast()
    const toastMessage = useCallback(() => {
        const clearQuery = () => {
            url = UrlHelper.delQueryParam(router.asPath, 'messageType')
            router.replace(url, undefined, { shallow: true })
        }
        let url
        switch (messageType) {
            case 'email-verified':
                toast(NotifyHelper.success(AppMsg.ACCOUNT_ACTIVATED))
                toast(NotifyHelper.success(AppMsg.CAN_NOW_LOGIN))
                clearQuery()
                break
            case 'checkout-succeeded':
                toast(NotifyHelper.success(`Checkout ${lan.SUCCESS}`))
                clearQuery()
                break
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageType])
    return { toastMessage }
}
