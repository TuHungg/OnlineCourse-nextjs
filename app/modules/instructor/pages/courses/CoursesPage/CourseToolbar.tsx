import { SearchIcon } from '@chakra-ui/icons'
import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    useControllableState,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { useUrlHelper } from '../../../../shared/hooks/url-helper.hook'
import { useCourseActions } from '../../../../shared/providers/course-actions.provider'
import { useInstructorCoursesUrlParams } from '../../../hooks/instructor-courses-url-params.hook'
import { useInstructorParams } from '../../../providers/instructor-params.provider'

const SearchBar = () => {
    const router = useRouter()
    const { getUrlWithQueryParams } = useUrlHelper()
    const { _searchValue } = useInstructorCoursesUrlParams()
    const [value, setValue] = useControllableState({ defaultValue: _searchValue || '' })

    useEffect(() => {
        setValue(_searchValue || '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_searchValue])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchDebounce = useCallback(
        debounce((searchValue: string) => {
            const url = getUrlWithQueryParams({
                _searchField: searchValue ? 'basicInfo.title' : '',
                _searchValue: searchValue,
                _page: '1',
            })
            router.push(url)
        }, 500),
        [router]
    )

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
        searchDebounce(e.target.value)
    }
    return (
        <InputGroup w={{ md: '300px' }}>
            <Input
                spellCheck={false}
                placeholder="Search your courses"
                value={value}
                onChange={onChange}
            />
            <InputRightElement pointerEvents="none">
                <SearchIcon color="gray.300" />
            </InputRightElement>
        </InputGroup>
    )
}

const Sort = () => {
    const router = useRouter()
    const { getUrlWithQueryParams } = useUrlHelper()
    const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const value = e.target.value
        const url = getUrlWithQueryParams({
            _sortBy: value,
            _order: value ? 'desc' : '',
        })
        router.push(url)
    }
    return (
        <Select w="200px" onChange={onChange}>
            <option value="history.createdAt">Newest</option>
            <option value="meta.avgRatingScore">Highest Rating</option>
        </Select>
    )
}

const NewCourseButton = () => {
    const { onNew } = useCourseActions()
    const [adding, setAdding] = useState<boolean>(false)
    const onNewClick = async () => {
        try {
            setAdding(true)
            await onNew()
        } catch (e) {}
    }
    return (
        <Button
            isDisabled={adding}
            ml={{ base: 2, md: 0 }}
            colorScheme={'purple'}
            onClick={onNewClick}
        >
            New Course
        </Button>
    )
}

export default function CoursesToolbar() {
    const {
        state: { viewMode },
    } = useInstructorParams()
    return (
        <Flex flexDir={{ base: 'column', md: 'row' }}>
            <SearchBar />
            <Flex
                flex={{ base: undefined, md: 1 }}
                justify={{ base: 'end', md: 'space-between' }}
                pl={[0, 0, 2]}
                pt={[2, 2, 0]}
            >
                <Sort />
                {!viewMode && <NewCourseButton />}
            </Flex>
        </Flex>
    )
}
