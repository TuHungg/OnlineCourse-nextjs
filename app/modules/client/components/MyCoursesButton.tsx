import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'

export interface MyCoursesButtonProps extends ButtonProps {}
export default function MyCoursesButton(props: MyCoursesButtonProps) {
    return (
        <NextLink href={PathHelper.getMyCoursesPath()}>
            <Button variant={'ghost'} {...props}>
                My courses
            </Button>
        </NextLink>
    )
}
