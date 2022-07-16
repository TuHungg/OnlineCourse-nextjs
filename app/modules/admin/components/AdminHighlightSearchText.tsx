import { TextProps } from '@chakra-ui/react'
import React from 'react'
import { useSearch } from '../providers/search.provider'
import HighlightText from './HighlightText'

export interface AdminHighlightSearchTextProps extends TextProps {
    fields: string[]
    value?: string
}
const AdminHighlightSearchText = ({ value, fields, ...props }: AdminHighlightSearchTextProps) => {
    const { field: searchField, value: searchValue } = useSearch()
    return (
        <HighlightText
            value={value}
            fields={fields}
            searchField={searchField}
            searchValue={searchValue}
            {...props}
        />
    )
}

export default React.memo(AdminHighlightSearchText)
