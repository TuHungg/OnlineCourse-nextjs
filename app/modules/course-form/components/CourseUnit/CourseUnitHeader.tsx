import { AccordionButton, AccordionIcon, HStack, Icon, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { MouseEventHandler, ReactNode, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUnit, selectFormCourseUnitNo } from '../../../../store/course/form-course.slice'
import lan from '../../../../utils/constants/lan.constant'
import Helper from '../../../../utils/helpers/helper.helper'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import { useSimpleDialog } from '../../../admin/providers/simple-dialog.provider'
import DeleteButton from '../../../shared/components/DeleteButton'
import DragButton from '../../../shared/components/DragButton'
import EditButton from '../../../shared/components/EditButton'
import { useCrudActions } from '../../../shared/hooks/data/crud-actions.hook'
import { useAppToast } from '../../../shared/hooks/app-toast.hook'
import { useUnitParams } from '../../providers/unit-params.provider'
import CourseLectureForm from '../CourseLecture/LectureForm/CourseLectureForm'
import CourseQuizForm from '../CourseQuiz/QuizForm/CourseQuizForm'

export interface CourseUnitHeaderProps {
    title: string
    action?: ReactNode
}

const CourseUnitHeader = (props: CourseUnitHeaderProps) => {
    const {
        address: { sectionId, unitId },
        state: { type: unitType },
        events: { dragButtonEvents },
    } = useUnitParams()
    const { onXThunkUpdate } = useCrudActions()
    const toast = useAppToast()
    const simpleAlert = useSimpleDialog()
    const unitNo = useSelector(selectFormCourseUnitNo(sectionId, unitId))
    //
    const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        simpleAlert.onShow({
            title: `${Helper.lodash.capitalize(lan.DELETE)} ${props.title}`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                try {
                    onXThunkUpdate(deleteUnit({ sectionId, unitId }))
                } catch (e: any) {
                    toast(NotifyHelper.somethingWentWrong)
                }
            },
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const [editMode, setEditMode] = useState<boolean>(false)
    //
    const { title, action } = props
    // actions
    const onEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        setEditMode(true)
    }

    const renderForm = useMemo(() => {
        switch (unitType) {
            case 'lecture':
                return (
                    <CourseLectureForm
                        sectionId={sectionId}
                        unitId={unitId}
                        onClose={() => setEditMode(false)}
                    />
                )
            case 'quiz':
                return (
                    <CourseQuizForm
                        sectionId={sectionId}
                        unitId={unitId}
                        onClose={() => setEditMode(false)}
                    />
                )
        }
    }, [sectionId, unitId, unitType])
    return (
        <>
            {!editMode ? (
                <AccordionButton as={'div'} className="no-focus-shadow" _hover={{}}>
                    <HStack
                        flex={1}
                        sx={{
                            '&:hover': {
                                '>.actions': {
                                    visibility: 'visible',
                                },
                            },
                        }}
                        spacing={2}
                    >
                        <HStack>
                            <Icon as={FaCheckCircle} />
                            <Text as="span">
                                {Helper.lodash.upperFirst(unitType)} {unitNo}:
                            </Text>
                        </HStack>
                        <Text>{title}</Text>
                        <HStack
                            display={{ base: 'none', md: 'flex' }}
                            visibility={'hidden'}
                            className="actions"
                            flex={1}
                            justify="space-between"
                        >
                            <HStack>
                                <EditButton onClick={onEdit} size="xs" />
                                <DeleteButton onClick={onDelete} size="xs" />
                            </HStack>
                            <DragButton
                                {...dragButtonEvents}
                                onClick={(e) => e.stopPropagation()}
                                aria-label=""
                            />
                        </HStack>
                        <HStack display={{ base: 'none', md: 'flex' }}>
                            {action && action}
                            <AccordionIcon />
                        </HStack>
                    </HStack>
                </AccordionButton>
            ) : (
                renderForm
            )}
        </>
    )
}
export default React.memo(CourseUnitHeader)
