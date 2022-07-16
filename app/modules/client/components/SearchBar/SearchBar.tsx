import { SearchIcon } from '@chakra-ui/icons'
import {
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    useControllableState,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import React, { ChangeEventHandler, useCallback, useEffect } from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import { useBorderColor } from '../../../shared/hooks/style.hook'
import { useClientUrlParams } from '../../hooks/client-url-params.hook'

export default function SearchBar() {
    const router = useRouter()
    const borderColor = useBorderColor()
    const borderWidth = useColorModeValue('1px', '2px')
    const { _searchValue } = useClientUrlParams()
    const [value, setValue] = useControllableState({ defaultValue: _searchValue || '' })

    useEffect(() => {
        setValue(_searchValue || '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_searchValue])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchDebounce = useCallback(
        debounce((searchValue: string) => {
            if (searchValue.trim() != '') {
                router.push(PathHelper.getFilteredCoursesWithSearchValue(searchValue))
            }
        }, 500),
        [router]
    )

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
        searchDebounce(e.target.value)
    }
    return (
        <InputGroup flex={1}>
            <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
                spellCheck={false}
                value={value}
                onChange={onChange}
                //@ts-ignore
                placeholder="Search for anything"
                variant="outline"
                htmlSize={37}
                borderRadius={'99999px'}
                mr="0 1.2rem"
                borderWidth={borderWidth}
                borderColor={borderColor}
            />
        </InputGroup>
    )
}
