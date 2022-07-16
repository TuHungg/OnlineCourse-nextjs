import { BoxProps, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import DateHelper from '../../../../../utils/helpers/date.helper'
import CourseHelper from '../../../../../utils/helpers/model-helpers/course.helper'
import Price from '../../../../shared/components/Price'
import ICourse from '../../../../shared/interfaces/models/course.interface'
import AddToCartButton from '../../../components/AddToCartButton'
import AddToFavoriteButton from '../../../components/AddToFavoriteButton'

const TimeLeft = ({ time }: { time: string }) => {
    const text = useMemo(() => {
        return DateHelper.getTimeDiffStringFromNow(new Date(time))
    }, [time])
    if (!text) return <></>
    return (
        <HStack color="red.500">
            <Icon as={AppIcon.clock} />
            <Text>{text} left at this price!</Text>
        </HStack>
    )
}

export interface CourseCheckoutProps extends BoxProps {
    course: ICourse
    size?: 'sm' | 'md'
}
export default function CourseCheckout({ size = 'md', course, ...props }: CourseCheckoutProps) {
    let prices = useMemo(() => {
        if (course)
            return CourseHelper.getPrices(
                course.basicInfo.price,
                course.basicInfo.currency,
                course.promotions
            )
    }, [course])
    prices = prices!
    return (
        <Stack {...props}>
            <Stack spacing={0}>
                <HStack justify={size == 'sm' ? 'space-between' : 'unset'}>
                    <Heading>
                        <Price value={prices.sellPrice} currency={course.basicInfo.currency} />
                    </Heading>
                    <HStack>
                        <Stack spacing={0} flexDir={size == 'md' ? 'row' : 'column'}>
                            {prices.discountPercent > 0 && (
                                <Text as="del" mr="3" color="gray.500">
                                    <Price
                                        value={prices.originPrice}
                                        currency={course.basicInfo.currency}
                                    />
                                </Text>
                            )}
                            {prices.discountPercent > 0 && (
                                <Text>{Math.floor(prices.discountPercent * 100)}% off</Text>
                            )}
                        </Stack>
                    </HStack>
                </HStack>
                {prices.discountPercent && <TimeLeft time={course.promotions.endAt!} />}
            </Stack>
            <Stack>
                <HStack flexDir="row" marginBottom={2} justify="space-between">
                    <AddToCartButton course={course} flex={1} />
                    <AddToFavoriteButton item={course} />
                </HStack>
            </Stack>
        </Stack>
    )
}
