import { Box, Button, Icon, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppIcon from '../../../../../utils/constants/app-icon.constant';
import { useCurriculumFormBg } from '../../../../shared/hooks/style.hook';
import { TUnitType } from '../../../../shared/interfaces/models/course.interface';
import { IUnitAddress } from '../../../interaces/unit-address.interface';
import CourseLectureForm from '../../CourseLecture/LectureForm/CourseLectureForm';
import CourseQuizForm from '../../CourseQuiz/QuizForm/CourseQuizForm';
import AddCourseLecture from './AddCourseLecture';
import AddUnitOptionBar from './AddUnitOptionBar';

export interface AddCourseUnitProps extends IUnitAddress { unitIdx?: number }

export default function AddCourseUnit(props: AddCourseUnitProps) {
    const [addMode, setAddMode] = useState<boolean>(false);
    const bg = useCurriculumFormBg();
    const buttonOpacity = addMode ? 1 : 0;
    const [unitType, setUnitType] = useState<TUnitType>();
    const renderAddSection = useMemo(() => {
        switch (unitType) {
            case 'lecture':
                return <CourseLectureForm {...props} formType='add' onClose={() => setAddMode(false)} />
            case 'quiz':
                return <CourseQuizForm {...props} formType='add' onClose={() => setAddMode(false)} />
        }
    }, [props, unitType]);

    useEffect(()=>{
        if (!addMode) setUnitType(undefined);
    }, [addMode])

    const onCancel = useCallback(() => {
        setAddMode(false);
    }, []);

    return (
        <Stack
            sx={{
                'button': {
                    transition: 'opacity 2s',
                },
                '&:hover': {
                    'button': {
                        opacity: 1
                    }
                }
            }}
            pb={addMode ? 2 : undefined}
        >
            <Box ml={-24}>
                {
                    !addMode ? (
                        <Button
                            colorScheme='purple'
                            size='xs'
                            opacity={buttonOpacity}
                            onClick={() => setAddMode(true)}
                            leftIcon={<Icon as={AppIcon.add} />} >
                            Add</Button>
                    ) : (
                        <Button
                            size='xs'
                            colorScheme='gray'
                            opacity={buttonOpacity}
                            onClick={onCancel}
                            leftIcon={<Icon as={AppIcon.x} />} >
                            Cancel</Button>
                    )
                }
            </Box>

            {
                addMode ? (
                    <Stack
                        border='1px solid black'
                        transitionProperty={'background-color'}
                        transitionDuration='normal'
                        bgColor={bg}
                    >
                        {
                            !unitType ? (
                                <AddUnitOptionBar setUnitType={setUnitType} />
                            ) : renderAddSection
                        }
                    </Stack>
                ) : null
            }
        </Stack>
    )
}
