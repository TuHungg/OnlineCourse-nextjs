import { Button } from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../utils/helpers/path.helper'
import { useAuth } from '../../auth/providers/auth.provider'
import NextLink from '../../shared/components/NextLink'
import { useSidebar } from '../../shared/providers/sidebar.provider'

export const AuthButtons = () => {
    const { onClose } = useSidebar()
    const {
        state: { user },
    } = useAuth()

    if (!!user || typeof user == 'undefined') return <></>

    return (
        <>
            <NextLink href={PathHelper.getLoginPath()}>
                <Button onClick={onClose} w="full" size="sm" variant="outline">
                    Log In
                </Button>
            </NextLink>
            <NextLink href={PathHelper.getSignUpPath()}>
                <Button onClick={onClose} w="full" size="sm" colorScheme={'purple'} variant="solid">
                    Sign Up
                </Button>
            </NextLink>
        </>
    )
}
