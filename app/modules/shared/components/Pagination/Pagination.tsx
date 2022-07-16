import { HStack, Stack, ThemeTypings } from '@chakra-ui/react'
import React from 'react'
import { IPagination } from '../../interfaces/pagination.interface'
import { PaginationDescription } from './PaginationDescription'
import { PaginationPages } from './PaginationPages'
import { RowsPerPage } from './RowsPerPage'

export interface PaginationProps {
    showRows?: boolean
    scroll?: boolean
    colorScheme?: ThemeTypings['colorSchemes']
    pagination: IPagination
}

function Pagination({
    showRows = true,
    scroll = false,
    colorScheme = 'blue',
    pagination,
}: PaginationProps) {
    return (
        <Stack
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'center', lg: 'flex-end' }}
            justify={{ base: 'flex-end', lg: 'space-between' }}
            spacing={4}
            p={4}
        >
            <PaginationDescription />
            <HStack spacing={4}>
                {showRows ? (
                    <RowsPerPage
                        scroll={scroll}
                        pagination={pagination}
                        colorScheme={colorScheme}
                    />
                ) : null}
                <PaginationPages
                    scroll={scroll}
                    pagination={pagination}
                    colorScheme={colorScheme}
                />
            </HStack>
        </Stack>
    )
}

export default React.memo(Pagination)
