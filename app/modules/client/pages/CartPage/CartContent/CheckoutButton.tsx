import { Button, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import NotifyHelper from '../../../../../utils/helpers/notify.helper'
import PathHelper from '../../../../../utils/helpers/path.helper'
import { useAuthParams } from '../../../../auth/providers/auth-params.provider'
import { useAuth } from '../../../../auth/providers/auth.provider'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import { useCart } from '../../../providers/cart.provider'

export const CheckoutButton = () => {
    const router = useRouter()
    const toast = useAppToast()
    const {
        methods: { setWaitingRedirectPath },
    } = useAuthParams()
    const { paying, onCheckout } = useCart()
    const {
        state: { user },
    } = useAuth()

    if (typeof user == 'undefined') return <></>
    //
    const onCheckoutClick = async () => {
        if (!!user) {
            try {
                await onCheckout()
            } catch (e) {
                toast(NotifyHelper.somethingWentWrong)
            }

            return
        }
        toast(NotifyHelper.info('You need to login for checkout'))
        setWaitingRedirectPath(router.asPath)
        router.push(PathHelper.getLoginPath())
    }
    return (
        <Button
            isDisabled={paying}
            w="full"
            size={'lg'}
            onClick={onCheckoutClick}
            colorScheme={'pink'}
            leftIcon={<Icon as={AppIcon.bank} />}
            iconSpacing={2}
        >
            Checkout with MoMo
        </Button>
    )
}
