import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import PathHelper from '../../../../utils/helpers/path.helper'
import { useMobileSearch } from '../../providers/mobile-search-provider'

interface FormData {
    value: string
}

export default function MobileSearch() {
    const { isOpen, onClose } = useMobileSearch()
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<FormData>()

    const onSubmit = handleSubmit(async (values) => {
        const { value: searchValue } = values
        if (searchValue.trim() != '') {
            router.push(PathHelper.getFilteredCoursesWithSearchValue(searchValue))
        }
        reset()
        onClose()
    })
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody>
                    <form onSubmit={onSubmit}>
                        <HStack>
                            <InputGroup>
                                <Input autoFocus placeholder="Search ..." {...register('value')} />
                                <InputRightElement>
                                    <DrawerCloseButton />
                                </InputRightElement>
                            </InputGroup>
                        </HStack>
                    </form>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}
