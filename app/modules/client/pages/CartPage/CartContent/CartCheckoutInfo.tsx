import { Text, Heading, Stack, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    selectTotalOriginPrice,
    selectTotalSellPrice,
} from '../../../../../store/course/cart.slice'
import CourseHelper from '../../../../../utils/helpers/model-helpers/course.helper'
import Price from '../../../../shared/components/Price'
import { CheckoutButton } from './CheckoutButton'

function CartCheckoutInfo() {
    const totalPrice = useSelector(selectTotalOriginPrice)
    const sellPrice = useSelector(selectTotalSellPrice)
    const percent = Math.floor(((totalPrice - sellPrice) / totalPrice) * 100)
    return (
        <Stack spacing={4}>
            {/* <Text fontSize={'lg'}>Total:</Text> */}
            <HStack spacing={1} justify="space-between">
                <Heading fontSize={['2xl', '3xl', '4xl']}>
                    <Price value={sellPrice} />
                </Heading>
                {percent > 0 ? (
                    <Stack spacing={0}>
                        <Text as="del">
                            <Price value={totalPrice} />
                        </Text>
                        <Text fontWeight={'bold'}>{percent}% off</Text>
                    </Stack>
                ) : null}
            </HStack>
            <CheckoutButton />
        </Stack>
    )
}

export default React.memo(CartCheckoutInfo)
