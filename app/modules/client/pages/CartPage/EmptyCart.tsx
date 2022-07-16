import { Text, Image, Box, VStack, Button } from '@chakra-ui/react'
import React from 'react'
import AppImg from '../../../../utils/constants/app-img.constant'
import PathHelper from '../../../../utils/helpers/path.helper'
import NextLink from '../../../shared/components/NextLink'
import { useBorderColor } from '../../../shared/hooks/style.hook'

export default function EmptyCart() {
    const borderColor = useBorderColor()
    return (
        <Box p={5} border="1px solid" borderColor={borderColor}>
            <VStack>
                <Image maxW={'250px'} alt="Cart image" src={AppImg.EMPTY_SHOPPING_CART} />
                <VStack pb={10}>
                    <Text>Your cart is empty. Keep shopping to find a course!</Text>
                    <NextLink href={PathHelper.getClientPath()}>
                        <Button colorScheme={'purple'}>Keep shopping</Button>
                    </NextLink>
                </VStack>
            </VStack>
        </Box>
    )
}
