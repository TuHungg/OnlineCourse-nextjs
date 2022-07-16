import { Button, ButtonProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import PathHelper from '../../../utils/helpers/path.helper'
import { useAuth } from '../../auth/providers/auth.provider'
import { TRoleName } from '../interfaces/models/role.interface'
import { TColorScheme } from '../types/color-scheme.type'
import NextLink from './NextLink'

export interface RoleSwitchButtonProps extends ButtonProps {}
function RoleSwitchButton(props: RoleSwitchButtonProps) {
    const router = useRouter()
    const {
        state: { user },
    } = useAuth()
    if (!user) return <></>
    if (user.role.name == 'Student') return <></>

    let title = 'Go to Home Page'
    let url = PathHelper.getClientPath()
    let colorScheme: TColorScheme = 'gray'
    if (user.role.name == 'Instructor' && !PathHelper.isInstructorPath(router.asPath)) {
        title = 'Switch to Instructor'
        url = PathHelper.getInstructorPath('courses')
        colorScheme = 'purple'
    } else if (
        (['Admin', 'Manager'] as TRoleName[]).includes(user.role.name) &&
        !PathHelper.isAdminPath(router.asPath)
    ) {
        title = 'Admin Control Panel'
        url = PathHelper.getAdminPerformancePath('overview')
        colorScheme = 'blue'
    }
    return (
        <NextLink href={url || '#'}>
            <Button colorScheme={colorScheme} size="sm" variant="outline" {...props}>
                {title}
            </Button>
        </NextLink>
    )
}

export default React.memo(RoleSwitchButton)
