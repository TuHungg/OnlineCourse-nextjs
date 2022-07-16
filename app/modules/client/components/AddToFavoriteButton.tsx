import { Icon, IconButton, useTheme } from '@chakra-ui/react'
import React, { useCallback, useMemo } from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'
import NotifyHelper from '../../../utils/helpers/notify.helper'
import { useAuth } from '../../auth/providers/auth.provider'
import { useClientToast } from '../../shared/hooks/client-toast.hook'
import ICourse from '../../shared/interfaces/models/course.interface'
import {
    useAddToWishlist,
    useDeleteFromWishlist,
    useWishlistCourseIdsQuery,
} from '../queries/wishlist-query.hook'

function AddToFavoriteButton({ item, size = 'md' }: { item: ICourse; size?: 'md' | 'sm' }) {
    const theme = useTheme()
    const gray = theme.colors.gray
    const toast = useClientToast()
    const {
        state: { user },
    } = useAuth()
    const { mutate: addToWishlist } = useAddToWishlist()
    const { mutate: deleteFromWishlist } = useDeleteFromWishlist()
    const { data: wishlistCourseIds } = useWishlistCourseIdsQuery()
    const isInWishlist = useMemo(() => {
        return wishlistCourseIds?.includes(item._id)
    }, [item._id, wishlistCourseIds])
    const onClick = useCallback(() => {
        if (isInWishlist) {
            // delete
            deleteFromWishlist([item._id])
            toast(NotifyHelper.success('Course deleted from wishlist'))
        } else {
            //add
            addToWishlist([item._id])
            toast(NotifyHelper.success('Course added to wishlist'))
        }
    }, [addToWishlist, deleteFromWishlist, isInWishlist, item._id, toast])
    if (!user) return <></>
    return (
        <IconButton
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            aria-label="favorite product"
            variant="unstyled"
            pt={0.5}
            icon={
                <Icon
                    color={isInWishlist ? 'red.500' : gray[300]}
                    fontSize={size == 'md' ? '35px' : '25px'}
                    as={isInWishlist ? AppIcon.favoriteFilled : AppIcon.favoriteFilled}
                />
            }
        />
    )
}

export default React.memo(AddToFavoriteButton)
