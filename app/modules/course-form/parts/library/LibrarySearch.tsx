import {
    Button,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import MyInput from '../../../shared/components/MyInput'
import { useIgnoreFirstEffect } from '../../../shared/hooks/use-ignore-first-effect'
import { useSimplePagination } from '../../../shared/providers/simple-pagination.provider'
import { useLibrary } from '../../providers/library.provider'

let timeout: any
export default function LibrarySearch() {
    const {
        methods: { setPage },
    } = useSimplePagination()
    const {
        state: { search },
        methods: { setSearch },
    } = useLibrary()
    const { register, watch } = useForm<{ search: string }>({ defaultValues: { search } })
    const searchVal = watch('search')
    useIgnoreFirstEffect(() => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setSearch(searchVal)
            setPage(1)
        }, 500)
    }, [searchVal, setSearch])

    return (
        <HStack justify={'end'}>
            <InputGroup size="md" maxW="300px">
                <Input isTruncated {...register('search')} placeholder="Search files by name" />
                <InputRightElement>
                    <Icon as={AppIcon.search} />
                </InputRightElement>
            </InputGroup>
        </HStack>
    )
}
