import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useQueryClient } from 'react-query'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import { useAuth } from '../../../auth/providers/auth.provider'
import { useUnarchiveCourses } from '../../../client/queries/archived-courses-query'
import { getCourseDetailSlug } from '../../../client/queries/course-detail-query.hook'
import { useArchiveCourses } from '../../../client/queries/learning-courses-query.hook'
import {
    useAddToWishlist,
    useDeleteFromWishlist,
    useWishlistCourseIdsQuery,
} from '../../../client/queries/wishlist-query.hook'
import { useClientToast } from '../../../shared/hooks/client-toast.hook'
import { RQK_LEARN_COURSE, useLearnCourseQuery } from '../../hooks/user-course-query.hook'

const FavAction = () => {
    const { data: learnCourse } = useLearnCourseQuery()
    const toast = useClientToast()
    const { data: wishlistIds = [] } = useWishlistCourseIdsQuery()
    const { mutate: addToWishlist } = useAddToWishlist()
    const { mutate: deleteFromWislist } = useDeleteFromWishlist()
    if (!learnCourse) return <></>
    const isFav = wishlistIds.includes(learnCourse.course._id || '')
    const name = isFav ? 'Unfavorie' : 'Favorite'
    const onClick = () => {
        if (isFav) {
            // unfav
            deleteFromWislist([learnCourse.course._id])
        } else {
        }
        addToWishlist([learnCourse.course._id])
    }
    return <MenuItem onClick={onClick}>{name} this course</MenuItem>
}
const ArchiveAction = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const courseSlug = getCourseDetailSlug(router.query)
    const {
        state: { user },
    } = useAuth()
    const { data } = useLearnCourseQuery()
    const { mutate: archiveCourses } = useArchiveCourses()
    const { mutate: unarchiveCourses } = useUnarchiveCourses()
    const name = data?.archived.isArchived ? 'Unarchive' : 'Archive'
    if (!data) return <></>
    const onClick = async () => {
        if (data.archived.isArchived) {
            // unarchive
            await unarchiveCourses([data._id])
        } else {
            await archiveCourses([data._id])
        }
        queryClient.invalidateQueries([RQK_LEARN_COURSE, user?._id, courseSlug])
    }
    return <MenuItem onClick={onClick}>{name} this course</MenuItem>
}

export default function LearnMenu() {
    return (
        <Menu>
            <MenuButton
                size="sm"
                as={IconButton}
                icon={<Icon as={AppIcon.moreVertical} />}
            ></MenuButton>

            <MenuList>
                <FavAction />
                <ArchiveAction />
            </MenuList>
        </Menu>
    )
}
