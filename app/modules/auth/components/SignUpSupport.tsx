import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'

export default function SignUpSupport() {
    return (
        <HStack justify={'center'}>
            <Text fontSize={'sm'}>Already have an account?</Text>
            <NextLink href={PathHelper.getLoginPath()}>
                <Button size="sm" colorScheme={'purple'} variant={'link'}>
                    Log In
                </Button>
            </NextLink>
        </HStack>
    )
}
