import { Box, Button, Icon, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import AppIcon from '../../../../../utils/constants/app-icon.constant';
import { IUnitAddress } from '../../../interaces/unit-address.interface';
import CourseLectureForm from '../../CourseLecture/LectureForm/CourseLectureForm';
import { AddCourseUnitProps } from './AddCourseUnit';

export default function AddCourseUnit(props: AddCourseUnitProps) {
    const [addMode, setAddMode] = useState<boolean>(false);
    const bg = useColorModeValue('gray.50', 'gray.600');
    const buttonOpacity = addMode ? 1 : 0;

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
                            onClick={() => setAddMode(false)}
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
                    </Stack>
                ) : null
            }
        </Stack>
    )
}
