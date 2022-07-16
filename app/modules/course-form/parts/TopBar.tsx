import { Button, HStack, Icon, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { selectFormCourseId } from '../../../store/course/form-course.slice'
import AppIcon from '../../../utils/constants/app-icon.constant'
import PathHelper from '../../../utils/helpers/path.helper'
import ThemeButton from '../../admin/components/ThemeButton'
import { useAuth } from '../../auth/providers/auth.provider'
import NextLink from '../../shared/components/NextLink'
import ProfilePopover from '../../shared/components/ProfileBox/ProfilePopover'
import { TModule } from '../../shared/types/module.type'
import { useIsCourseFormMobile } from '../hooks/is-course-form-mobile.hook'

const SettingButton = () => {
    const id = useSelector(selectFormCourseId)
    const router = useRouter()
    return (
        <NextLink href={PathHelper.getCourseFormPath(id!, 'settings', router.pathname)}>
            <IconButton aria-label="" icon={<Icon as={AppIcon.settings} />} size="sm" />
        </NextLink>
    )
}

export const COURSE_FORM_TOP_BAR_HEIGHT = 56
function TopBar() {
    const {
        state: { user },
    } = useAuth()
    const isMobile = useIsCourseFormMobile()
    const bg = useColorModeValue('black', 'gray.800')
    const backUrl = !!user ? PathHelper.getCourseFormBackPath(user.role.name) : '#'
    const profileContext = user?.role.name.toLowerCase()
    return (
        <HStack
            zIndex={'sticky'}
            position={'fixed'}
            w="100vw"
            h={COURSE_FORM_TOP_BAR_HEIGHT + 'px'}
            p={4}
            top={0}
            px={8}
            bgColor={bg}
            justify={'space-between'}
            shadow="lg"
            transitionProperty={'background-color'}
            transitionDuration="normal"
        >
            <NextLink href={backUrl}>
                <Button
                    colorScheme={'whiteSmoke'}
                    variant="link"
                    leftIcon={<Icon as={FiArrowLeft} />}
                >
                    Back to courses
                </Button>
            </NextLink>
            <HStack>
                <ThemeButton size="sm" />
                <SettingButton />
                <ProfilePopover
                    size={isMobile ? 'sm' : 'md'}
                    context={(profileContext as TModule) || 'admin'}
                />
            </HStack>
        </HStack>
    )
}

export default React.memo(TopBar)
