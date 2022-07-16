import { Badge, Button, HStack, Icon } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'
import { useCountWishlist } from '../queries/wishlist-query.hook'
import IconButtonWithNumber from './IconButtonWithNumber'

export default function WishlistButton() {
    const { data: countWishlist } = useCountWishlist()
    return (
        <NextLink href={PathHelper.getMyCoursesPath('wishlist')}>
            <IconButtonWithNumber icon={AppIcon.favoriteOutline} number={countWishlist} />
        </NextLink>
    )
}
