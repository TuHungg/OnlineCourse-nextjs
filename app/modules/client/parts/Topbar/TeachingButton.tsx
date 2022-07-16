import {
    Button,
    ButtonProps,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import CookieHelper from '../../../../utils/helpers/cookie.helper'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import PathHelper from '../../../../utils/helpers/path.helper'
import { useAuth } from '../../../auth/providers/auth.provider'
import { useSwitchToInstructor } from '../../../auth/queries/auth-user-query.hook'
import { useClientToast } from '../../../shared/hooks/client-toast.hook'

export default function TeachingButton(props: ButtonProps) {
    const toast = useClientToast()
    const router = useRouter()
    const { mutate: switchToInstructor } = useSwitchToInstructor()
    const {
        state: { user },
    } = useAuth()
    const isStudent = user?.role.name == 'Student'
    const onTeaching = useCallback(() => {
        switchToInstructor(undefined, {
            onSuccess: () => {
                CookieHelper.removeAccessToken()
                router.push(PathHelper.getInstructorPath('courses')).then(() => {
                    toast(NotifyHelper.success('Welcome to Instructor community!'))
                    toast(NotifyHelper.success("Let's create your first course."))
                })
            },
        })
    }, [router, switchToInstructor, toast])
    if (!isStudent) return <></>
    return (
        <Popover trigger="hover">
            <PopoverTrigger>
                <Button onClick={onTeaching} variant="ghost" {...props}>
                    Teaching with Us
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody p={5}>
                    <Stack align={'center'}>
                        <Text as="strong">Become an Instructor today!</Text>
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
