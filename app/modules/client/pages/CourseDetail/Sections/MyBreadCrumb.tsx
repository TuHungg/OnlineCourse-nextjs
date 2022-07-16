import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'

const MyBreadCrumb = () => {
    return (
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
                <BreadcrumbLink color={'white'} href="#">
                    Home
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink color="white" href="#">
                    About
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="white" href="#">
                    Contact
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}
