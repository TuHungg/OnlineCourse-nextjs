import { Text, TextProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Helper from '../../../utils/helpers/helper.helper'

export interface HighlightSearchTextProps extends TextProps {
    fields: string[]
    value?: string
    searchField: string
    searchValue: string
}
const HighlightText = ({
    value = '',
    fields,
    searchField,
    searchValue,
    ...props
}: HighlightSearchTextProps) => {
    const color = useColorModeValue('yellow', 'purple')
    if (!!value && searchValue != '' && (searchField == 'all' || fields.includes(searchField))) {
        const reverse = Helper.reverseString(searchValue)
        const pattern = new RegExp(`(${searchValue}|${reverse})`, 'ism')
        value = value.replace(pattern, `<span style="background-color: ${color}">$1</span>`)
    }
    return (
        <Text
            whiteSpace={{ base: 'pre-wrap', md: 'unset' }}
            as="span"
            dangerouslySetInnerHTML={{ __html: value }}
            {...props}
        ></Text>
    )
}

export default React.memo(HighlightText)
