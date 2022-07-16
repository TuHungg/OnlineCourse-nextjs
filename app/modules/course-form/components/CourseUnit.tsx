import { AccordionItem, Box, Stack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formCourseSetUnitExpandedIndexes, selectFormCourseUnitByIds } from '../../../store/course/form-course.slice';
import { TUnitType } from '../../shared/interfaces/models/course.interface';
import { useUnitBgColor } from '../hooks/unit-bg-color.hook';
import { useUnitSortable } from '../hooks/unit-sortable.hook';
import { IUnitAddress } from '../interaces/unit-address.interface';
import { UnitParamsProvider } from '../providers/unit-params.provider';
import AddCourseUnit from './CourseUnit/AddUnit/AddCourseUnit';
import CourseLecture from './CourseLecture/CourseLecture';
import CourseQuiz from './CourseQuiz/CourseQuiz';

export interface CourseLectureProps {
    sectionId: string
    unitId: string
    unitIdx: number
}

const Main = ({
    sectionId,
    unitId,
    dragButtonEvents,
    unitType,
    isOver,
    opacity,
    unitIdx,
}: {
    unitIdx: number,
    sectionId: string
    unitId: string,
    unitType: TUnitType,
    dragButtonEvents: any,
    isOver: boolean,
    opacity: number

}) => {
    const bgColor = useUnitBgColor();
    const renderUnitContent = useMemo(() => {
        switch (unitType) {
            case 'lecture':
                return <CourseLecture />
            case 'quiz':
                return <CourseQuiz />
        }
    }, [unitType])
    return <UnitParamsProvider
        address={{
            sectionId: sectionId,
            unitId,
        }}
        unitType={unitType}
        dragButtonEvents={dragButtonEvents}
    >
        <Stack spacing={0} >
            <AddCourseUnit sectionId={sectionId} unitId={unitId} unitIdx={unitIdx} />
            <AccordionItem
                bgColor={isOver ? 'cyan.100' : bgColor}
                border='1px solid black'
                transitionProperty={'background-color'}
                transitionDuration='normal'
            >
                <Stack
                    opacity={opacity}
                    spacing={0}
                >
                    {renderUnitContent}
                </Stack>
            </AccordionItem>
        </Stack>
    </UnitParamsProvider>
}
const MainMemo = React.memo(Main);


const CourseUnit = (props: CourseLectureProps) => {
    const dispatch = useDispatch();
    const unit = useSelector(selectFormCourseUnitByIds(props.sectionId, props.unitId))!;
    //
    const address: IUnitAddress = { ...props, unitId: unit?._id || '' };
    const { ref, handlerId, opacity, state: { isOver, isDragging }, dragButtonEvents } = useUnitSortable(address);

    useEffect(() => {
        isDragging && dispatch(formCourseSetUnitExpandedIndexes({sectionId:props.sectionId, indexes:[]}))
    }, [dispatch, isDragging, props.sectionId])

    return (
        <Box ref={ref}
            data-handler-id={handlerId}
        >

            <MainMemo unitIdx={props.unitIdx} unitType={unit.type} sectionId={props.sectionId} unitId={props.unitId}
                dragButtonEvents={dragButtonEvents} isOver={isOver} opacity={opacity} />
        </Box>

    )
}

export default React.memo(CourseUnit);