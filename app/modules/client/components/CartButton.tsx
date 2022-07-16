import { ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalCourse } from '../../../store/course/cart.slice'
import AppIcon from '../../../utils/constants/app-icon.constant'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'
import IconButtonWithNumber from './IconButtonWithNumber'

export interface CartButtonProps extends ButtonProps {}
export default function CartButton(props: CartButtonProps) {
    const totalCourse = useSelector(selectTotalCourse)
    return (
        <NextLink href={PathHelper.getCartPath()}>
            <IconButtonWithNumber icon={AppIcon.cart} number={totalCourse} {...props} />
        </NextLink>
    )
}
