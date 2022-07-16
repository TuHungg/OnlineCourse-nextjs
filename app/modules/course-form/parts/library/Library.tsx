import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'
import SimplePaginationButtons from '../../../shared/components/SimplePaginationButtons'
import {
    SimplePaginationProvider,
    useSimplePagination,
} from '../../../shared/providers/simple-pagination.provider'
import { TFileType, useCountMyFilesQuery, useMyFilesQuery } from '../../hooks/my-files-query.hook'
import { LibraryProvider, useLibrary } from '../../providers/library.provider'
import LibrarySearch from './LibrarySearch'
import LibraryTable from './LibraryTable'

const ROWS_PER_PAGE = 10
const Table = () => {
    const {
        state: { fileType },
    } = useLibrary()
    const {
        state: { page },
    } = useSimplePagination()
    const { isLoading, data } = useMyFilesQuery(page, ROWS_PER_PAGE, fileType)
    return (
        <Skeleton isLoaded={!isLoading}>
            <Stack>
                <LibraryTable rows={data} />
                <SimplePaginationButtons />
            </Stack>
        </Skeleton>
    )
}
const Main = () => {
    const {
        state: { fileType },
    } = useLibrary()
    const { data: totalItem } = useCountMyFilesQuery(fileType)
    return (
        <Stack>
            <SimplePaginationProvider totalItem={totalItem} rowsPerPage={ROWS_PER_PAGE}>
                <LibrarySearch />
                <Table />
            </SimplePaginationProvider>
        </Stack>
    )
}

export interface LibraryProps {
    fileType?: TFileType
}
export default function Library(props: LibraryProps) {
    return (
        <LibraryProvider fileType={props.fileType}>
            <Main />
        </LibraryProvider>
    )
}
