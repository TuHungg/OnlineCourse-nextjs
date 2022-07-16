import { Accordion, Skeleton } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import { hasViewPermission } from '../../../../utils/helpers/model-helpers/user.helper.'
import { useAuth } from '../../../auth/providers/auth.provider'
import { INavGroupItem } from '../../interfaces/nav-group-item.interface'
import { useAdminParams } from '../../providers/admin-params.provider'
import NavGroupItem from './NavGroupItem'

const navGroupItems: INavGroupItem[] = [
    {
        title: 'Users',
        icon: AppIcon.users,
        navItems: [
            {
                name: 'Role',
                title: 'Rules Management',
                link: '/admin/permission-management',
                key: 'permission-management',
            },
            {
                name: 'Role',
                title: 'Roles',
                link: '/admin/roles',
                key: 'roles',
            },
            {
                name: 'User',
                title: 'Users',
                link: '/admin/users',
                key: 'users',
            },
            {
                name: 'Activity Log',
                title: 'Activity logs',
                link: '/admin/activity-logs',
                key: 'activity-logs',
            },
        ],
    },
    {
        title: 'Catalog',
        icon: AppIcon.catalog,
        navItems: [
            {
                name: 'Slider',
                title: 'Sliders',
                link: '/admin/sliders',
                key: 'sliders',
            },
            {
                name: 'Category',
                title: 'Categories',
                link: '/admin/categories',
                key: 'categories',
            },
            // {
            //     title: 'Topics',
            //     link: '/admin/topics',
            //     key: 'topics'
            // },
            {
                name: 'Course',
                title: 'Courses',
                link: '/admin/courses',
                key: 'courses',
            },
        ],
    },
    {
        title: 'Performance',
        icon: AppIcon.performance,
        navItems: [
            {
                name: 'Performances',
                title: 'Overview',
                link: '/admin/performance/overview',
                key: 'performance/overview',
            },
            {
                name: 'Performances',
                title: 'Active courses',
                link: '/admin/performance/active-courses',
                key: 'performance/active-courses',
            },
            {
                name: 'Performances',
                title: 'Instructors',
                link: '/admin/performance/instructors',
                key: 'performance/instructors',
            },
            {
                name: 'Performances',
                title: 'Orders',
                link: '/admin/performance/orders',
                key: 'performance/orders',
            },
        ],
    },
    {
        title: 'Payments',
        icon: AppIcon.payment,
        navItems: [
            {
                title: 'Instructor payments',
                link: '/admin/payments/instructor-payments',
                key: '',
            },
        ],
    },
    {
        title: 'Settings',
        icon: AppIcon.settings,
        navItems: [
            {
                name: 'Setting',
                title: 'General',
                link: '/admin/settings/general',
                key: '',
            },
        ],
    },
]

const genDefaultTabIndex = (page: string, groupItems?: INavGroupItem[]) => {
    return (
        groupItems?.findIndex((item) =>
            item.navItems.some((item) => {
                return page.indexOf(item.link) > -1
            })
        ) || 0
    )
}

function Nav() {
    const {
        state: { user },
    } = useAuth()
    const [groupItems, setGroupItems] = useState<INavGroupItem[]>()
    const { page } = useAdminParams()
    const [indexes, setIndexes] = useState<number[]>([])
    useEffect(() => {
        const defaultIndexes = genDefaultTabIndex(page, groupItems)
        setIndexes([defaultIndexes])
    }, [groupItems, page])

    useEffect(() => {
        if (user) {
            const groupItems = navGroupItems
                // filter only needed group
                .filter((item) => {
                    return item.navItems.some((item) => {
                        if (!item.name) return true
                        return hasViewPermission(user.role.permissions, item.name)
                    })
                })
            setGroupItems(groupItems)
        }
    }, [user])
    if (!user) return <></>

    const NavItemGroupsHtml = groupItems?.map((item) => {
        item.navItems = item.navItems.filter((item) => {
            if (!item.name) return true
            return hasViewPermission(user.role.permissions, item.name)
        })
        return (
            <NavGroupItem
                key={item.title}
                navItems={item.navItems}
                title={item.title}
                icon={item.icon}
            />
        )
    })
    return (
        <>
            <Skeleton isLoaded={!!user} w="full">
                <Accordion
                    w="full"
                    allowMultiple
                    index={indexes}
                    onChange={(item) => setIndexes(item as number[])}
                >
                    {NavItemGroupsHtml}
                </Accordion>
            </Skeleton>
        </>
    )
}
export default memo(Nav)
