import React, { useCallback } from 'react'
import AppTitle from '../../../../../utils/constants/app-title.constant'
import MyHead from '../../../../shared/components/MyHead'
import ICourse from '../../../../shared/interfaces/models/course.interface'
import { useWishlistQuery } from '../../../queries/wishlist-query.hook'
import MyCourseList from '../MyCourseList'
import WishlistCourseExcerpt from './WishlistCourseExcerpt'

export default function Wishlist() {
    const { isLoading, data: items } = useWishlistQuery()

    const renderItem = useCallback((item: ICourse, i) => {
        return <WishlistCourseExcerpt key={i} item={item} />
    }, [])

    return (
        <>
            <MyHead title={AppTitle.WISHLIST} />
            <MyCourseList isLoading={isLoading} items={items || []} renderItem={renderItem} />
        </>
    )
}
