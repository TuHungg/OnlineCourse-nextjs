import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    HStack,
    Icon,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { FiFile } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteSection,
    formCourseSetSectionExpandedIndexes,
    moveUnitToSection,
    selectFormCourseSection,
    swapCourseSection,
} from '../../../store/course/form-course.slice'
import lan from '../../../utils/constants/lan.constant'
import Helper from '../../../utils/helpers/helper.helper'
import NotifyHelper from '../../../utils/helpers/notify.helper'
import { useSimpleDialog } from '../../admin/providers/simple-dialog.provider'
import DeleteButton from '../../shared/components/DeleteButton'
import DragButton from '../../shared/components/DragButton'
import EditButton from '../../shared/components/EditButton'
import { useAppToast } from '../../shared/hooks/app-toast.hook'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import { useSortable } from '../../shared/hooks/sortable.hook'
import { TDragUnit } from '../hooks/unit-sortable.hook'
import AddCourseSection from './AddCourseSection'
import CourseSectionForm from './CourseSectionForm'
import CourseUnitList from './CourseUnitList'

const Header = (props: CourseSectionProps & { dragButtonEvents: any }) => {
    const { onXThunkUpdate } = useCrudActions()
    const simpleDialog = useSimpleDialog()
    const toast = useAppToast()
    const [editMode, setEditMode] = useState<boolean>(false)
    const section = useSelector(selectFormCourseSection(props.sectionIndex))
    const onEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        setEditMode(true)
    }
    const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        simpleDialog.onShow({
            title: `${Helper.lodash.capitalize(lan.DELETE)} ${section?.title}`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                try {
                    onXThunkUpdate(deleteSection({ sectionId: section!._id }))
                } catch (e: any) {
                    toast(NotifyHelper.somethingWentWrong)
                }
            },
        })
    }
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
                        <Text as="strong">Section {props.sectionIndex + 1}:</Text>
                        <HStack>
                            <Icon as={FiFile} />
                            <Text as="span">{section?.title}</Text>
                        </HStack>
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
                                {...props.dragButtonEvents}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </HStack>
                        <HStack>
                            <AccordionIcon />
                        </HStack>
                    </HStack>
                </AccordionButton>
            ) : (
                <CourseSectionForm
                    sectionIndex={props.sectionIndex}
                    onClose={() => setEditMode(false)}
                />
            )}
        </>
    )
}

export interface CourseSectionProps {
    sectionIndex: number
    sectionId: string
}

const Main = ({
    sectionId,
    sectionIndex,
    dragButtonEvents,
    isOver,
    opacity,
}: {
    dragButtonEvents: any
    isOver: boolean
    opacity: number
} & CourseSectionProps) => {
    const dispatch = useDispatch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const moveDebounce = (item: TDragUnit) => {
        dispatch(moveUnitToSection({ sectionId, unitAddress: item }))
        item.sectionId = sectionId
    }
    const [{}, drop] = useDrop(() => ({
        accept: 'section-course-unit',

        collect(monitor) {
            return {}
        },
        canDrop: (item: TDragUnit) => {
            if (item.sectionId != sectionId) {
                moveDebounce(item)
            }
            return true
        },
    }))

    const bg = useColorModeValue('gray.50', 'gray.600')

    return (
        <>
            <AddCourseSection sectionIndex={sectionIndex} />
            <AccordionItem
                ref={drop}
                border="1px solid black"
                transitionProperty={'background-color'}
                transitionDuration="normal"
                bgColor={isOver ? 'cyan.100' : bg}
                p={4}
            >
                <Stack opacity={opacity} spacing={0}>
                    {/* HEADER */}
                    <Header
                        dragButtonEvents={dragButtonEvents}
                        sectionIndex={sectionIndex}
                        sectionId={sectionId}
                    />

                    <AccordionPanel pb={4} mt={4}>
                        {/* BODY (lecture | quiz | ...) */}
                        <Box
                            pl={{
                                base: 5,
                                lg: 10,
                            }}
                        >
                            <CourseUnitList sectionId={sectionId} />
                        </Box>
                    </AccordionPanel>
                </Stack>
            </AccordionItem>
        </>
    )
}
const MainMemo = React.memo(Main)

const CourseSection = ({ sectionIndex, sectionId }: CourseSectionProps) => {
    const dispatch = useDispatch()

    // const moveDebounce = useCallback(Helper.lodash.debounce((item: TDragUnit) => {
    //     dispatch(formCourseMoveUnitToSection({ sectionId, unit: item }));
    // }, 100), []);

    // units of other sections
    const {
        ref,
        opacity,
        dragButtonEvents,
        state: { isDragging, isOver },
    } = useSortable({
        canDrag: false,
        accept: 'course-section',
        item: { id: sectionId },
        onSwap: (item, dropItem) => {
            dispatch(swapCourseSection({ aId: item.id, bId: sectionId }))
        },
    })

    useEffect(() => {
        isDragging && dispatch(formCourseSetSectionExpandedIndexes([]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDragging])
    //
    return (
        <Stack spacing={0} ref={ref}>
            <MainMemo
                dragButtonEvents={dragButtonEvents}
                isOver={isOver}
                opacity={opacity}
                sectionIndex={sectionIndex}
                sectionId={sectionId}
            />
        </Stack>
    )
}
export default React.memo(CourseSection)
