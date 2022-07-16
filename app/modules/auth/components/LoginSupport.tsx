import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'
import ForgotPassword from './ForgotPassword'

export default function LoginSupport() {
    return (
        <VStack spacing={6}>
            <HStack>
                <Text fontSize={'sm'}>or</Text>
                <ForgotPassword />
            </HStack>
            <HStack>
                <Text fontSize={'sm'}>{"Don't"} have an account?</Text>
                <NextLink href={PathHelper.getSignUpPath()}>
                    <Button size="sm" colorScheme={'purple'} variant={'link'}>
                        Sign up
                    </Button>
                </NextLink>
            </HStack>
        </VStack>
    )
}
