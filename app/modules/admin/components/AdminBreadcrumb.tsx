import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/react'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import Helper from '../../../utils/helpers/helper.helper'
import { useAdminParams } from '../providers/admin-params.provider'

export default function AdminBreadcrumb() {
    const { subPaths } = useAdminParams()
    const breadCrumbItemsHtml = subPaths.map((item) => {
        const title = Helper.lodash.capitalize(item)
        return (
            <BreadcrumbItem key={item}>
                <BreadcrumbLink>{title}</BreadcrumbLink>
            </BreadcrumbItem>
        )
    })
    return (
        <Breadcrumb spacing="8px" separator={<Icon as={FiChevronRight} color="gray.500" />}>
            {breadCrumbItemsHtml}
        </Breadcrumb>
    )
}
