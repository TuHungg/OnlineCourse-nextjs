import { Button, ButtonGroup, ButtonProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectFormCourse, selectFormCourseId } from '../../../store/course/form-course.slice'
import NotifyHelper from '../../../utils/helpers/notify.helper'
import PathHelper from '../../../utils/helpers/path.helper'
import { useSimpleDialog } from '../../admin/providers/simple-dialog.provider'
import { useAuth } from '../../auth/providers/auth.provider'
import { useAppToast } from '../../shared/hooks/app-toast.hook'
import { useApproveCourse, useSubmitForReview } from '../hooks/course-query.hook'

const SubmitForReviewButton = (props: CourseActionsProps) => {
    const {
        state: { user },
    } = useAuth()
    const { onShow } = useSimpleDialog()
    const toast = useAppToast()
    const router = useRouter()
    const courseId = useSelector(selectFormCourseId)
    const { mutate: submitForReview } = useSubmitForReview()
    const onSubmitForReview = () => {
        onShow({
            title: 'Submit Course for Review',
            content: 'Do you want to submit this course for review?',
            colorScheme: 'purple',
            onPositive: () => {
                submitForReview(courseId!, {
                    onSuccess: (_) => {
                        router.push(PathHelper.getCourseFormBackPath(user!.role.name)).then((_) => {
                            toast(NotifyHelper.success('Course Submitted for Review'))
                        })
                    },
                })
            },
        })
    }
    return (
        <Button onClick={onSubmitForReview} colorScheme={'purple'} {...props}>
            Submit for Review
        </Button>
    )
}

const ApproveActions = (props: CourseActionsProps) => {
    const { onShow } = useSimpleDialog()
    const {
        state: { user },
    } = useAuth()
    const id = useSelector(selectFormCourseId)
    const { mutate: approveCourse } = useApproveCourse()
    const router = useRouter()
    const toast = useAppToast()
    const onApprove = () => {
        onShow({
            title: 'Approve Course',
            content:
                'Once the course is approved, it will be live on the website. Do you want to approve this course?',
            colorScheme: 'blue',
            onPositive: () => {
                approveCourse(
                    { id: id!, status: 'active' },
                    {
                        onSuccess: (_) => {
                            router.push(PathHelper.getCourseFormBackPath(user!.role.name))
                            toast(NotifyHelper.success('Course approved'))
                        },
                        onError: (_) => {
                            toast(NotifyHelper.somethingWentWrong)
                        },
                    }
                )
            },
        })
    }
    const onReject = () => {
        onShow({
            title: 'Reject Course',
            content: 'Do you want to reject this course?',
            colorScheme: 'yellow',
            onPositive: () => {
                approveCourse(
                    { id: id!, status: 'rejected' },
                    {
                        onSuccess: (_) => {
                            router.push(PathHelper.getCourseFormBackPath(user!.role.name))
                            toast(NotifyHelper.success('Course rejected'))
                        },
                        onError: (_) => {
                            toast(NotifyHelper.somethingWentWrong)
                        },
                    }
                )
            },
        })
    }
    return (
        <ButtonGroup>
            <Button onClick={onApprove} colorScheme={'blue'} {...props}>
                Approve
            </Button>
            <Button onClick={onReject} colorScheme={'yellow'} {...props}>
                Reject
            </Button>
        </ButtonGroup>
    )
}

export interface CourseActionsProps extends ButtonProps {}
export default function CourseActions(props: CourseActionsProps) {
    const course = useSelector(selectFormCourse)
    if (!course) return <></>
    if (course.status == 'draft') return <SubmitForReviewButton {...props} />
    if (course.status == 'pending') return <ApproveActions {...props} />
    return <></>
}
