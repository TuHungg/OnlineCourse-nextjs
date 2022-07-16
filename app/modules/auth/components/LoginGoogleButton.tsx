import { Button, Icon, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'

export default function GoogleLoginButton() {
    const bg = useColorModeValue('white', undefined)
    return (
        <NextLink href={PathHelper.getGoogleLoginUrl()}>
            <Button
                bgColor={bg}
                shadow="md"
                leftIcon={<Icon fontSize={'25px'} as={AppIcon.google} />}
                w="full"
                iconSpacing={4}
                justifyContent={'left'}
            >
                Continue with Google
            </Button>
        </NextLink>
    )
}
