import { Box, HStack, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchById } from '../../../../app/apis/acp/admin.api'
import { useAuth } from '../../../../app/modules/auth/providers/auth.provider'
import LearnMobileSidebar from '../../../../app/modules/learn/components/LearnMobileSidebar/LearnMobileSidebar'
import { useIsLearnMobile } from '../../../../app/modules/learn/hooks/is-learn-mobile.hook'
import { useLearnCourseQuery } from '../../../../app/modules/learn/hooks/user-course-query.hook'
import ContentBox from '../../../../app/modules/learn/parts/ContentBox/ContentBox'
import CourseDashboard from '../../../../app/modules/learn/parts/CourseDashboard/CourseDashboard'
import LearnSidebar from '../../../../app/modules/learn/parts/LearnSidebar/LearnSidebar'
import LearnTopBar from '../../../../app/modules/learn/parts/LearnTopbar/LearnTopBar'
import MyHead from '../../../../app/modules/shared/components/MyHead'
import IComment from '../../../../app/modules/shared/interfaces/models/comment.interface'
import ICourse from '../../../../app/modules/shared/interfaces/models/course.interface'
import {
    SidebarProvider,
    useSidebar,
} from '../../../../app/modules/shared/providers/sidebar.provider'
import {
    setLearnCourse,
    setStateActiveContent,
} from '../../../../app/store/course/learn-course.slice'
import { NextPageWithLayout } from '../../../../app/types/next'
import AppTitle from '../../../../app/utils/constants/app-title.constant'
import PathHelper from '../../../../app/utils/helpers/path.helper'

const getAddressByUnitId = (course: ICourse, unitId: string) => {
    if (!course.details.sections) return { sIdx: 0, uIdx: 0 }
    let sIdx = course.details.sections.findIndex((section) =>
        section.units.some((item) => item._id == unitId)
    )
    //
    if (sIdx < 0)
        return {
            sIdx: 0,
            uIdx: 0,
        }
    //
    const uIdx = course.details.sections[sIdx].units.findIndex((unit) => unit._id == unitId)
    return {
        sIdx,
        uIdx: uIdx < 0 ? 0 : uIdx,
    }
}

const CourseInfo = () => {
    const { isOpen } = useSidebar()
    return (
        <Stack
            w="full"
            sx={{
                transition: 'padding-right .3s',
            }}
            pr={{ base: undefined, lg: isOpen ? '360px' : undefined }}
        >
            {/* VIDEO PLAYER */}
            <ContentBox />
            {/* COURSE DASHBOARD */}
            <CourseDashboard />
        </Stack>
    )
}

const useHandleCommentQuery = (course?: ICourse) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const query = router.query
    const { commentId } = query
    useEffect(() => {
        if (!!commentId && course) {
            const id = commentId as string
            fetchById<IComment>('comments', id).then((item) => {
                const address = getAddressByUnitId(course, item.unit.toString())
                dispatch(setStateActiveContent(address))
            })
        }
    }, [commentId, dispatch, course])
}

const LearningPage: NextPageWithLayout = () => {
    const {
        state: { user },
    } = useAuth()
    const { data: learnCourse } = useLearnCourseQuery()
    useHandleCommentQuery(learnCourse?.course)
    const router = useRouter()
    const dispatch = useDispatch()
    const isNoAuth = user === null
    useEffect(() => {
        if (isNoAuth) {
            router.replace(PathHelper.getClientPath())
        }
    }, [router, isNoAuth])

    //
    useEffect(() => {
        if (learnCourse) {
            dispatch(setLearnCourse(learnCourse))
        }
    }, [dispatch, learnCourse])
    const isMobile = useIsLearnMobile()

    if (!user) return <></>
    return (
        <>
            <MyHead title={AppTitle.LEARN + ` ${learnCourse?.course.basicInfo.title}`} />
            <SidebarProvider defaultIsOpen={!isMobile}>
                <Box>
                    <Stack spacing={0}>
                        {/* TOP BAR  */}
                        <LearnTopBar />
                        {/* CONTENT */}
                        <HStack
                            spacing={0}
                            alignItems="start"
                            overflowX="hidden"
                            position={'relative'}
                        >
                            <CourseInfo />
                            {!isMobile && <LearnSidebar />}
                        </HStack>
                    </Stack>
                    {isMobile && <LearnMobileSidebar />}
                </Box>
            </SidebarProvider>
        </>
    )
}

export default LearningPage
