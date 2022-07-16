import { Box, Button, Fade, Icon, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IconType } from 'react-icons';
import { FiPlus, FiTrash, FiX } from 'react-icons/fi';
import CourseSectionForm from './CourseSectionForm';

export interface AddCourseSectionProps {
    sectionIndex: number
}

function AddCourseSection(props: AddCourseSectionProps) {
    const [addMode, setAddMode] = useState<boolean>(false);
    const bg = useColorModeValue('gray.50', 'gray.600');
    const buttonOpacity = addMode ? 1 : 0;
    const renderButton = (title: string, color: string, icon: IconType, onClick: () => void) => (
        <Button
            size='sm'
            colorScheme={color}
            opacity={buttonOpacity}
            onClick={onClick}
            leftIcon={<Icon as={icon} />}
        >{title}</Button>
    )

    return (
        <Stack py={2}
            sx={{
                'button': {
                    transition: 'opacity 1s ease-in',
                },
                '&:hover': {
                    'button': {
                        opacity: 1
                    }
                }
            }}
        >
            <Box>
                {
                    !addMode ? (
                        renderButton('Add section', 'purple', FiPlus, () => setAddMode(true))
                    ) : (
                        renderButton('Cancel', 'gray', FiX, () => setAddMode(false))
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
                        p={4}
                    >
                        <CourseSectionForm formType='add' sectionIndex={props.sectionIndex} onClose={() => setAddMode(false)} />
                    </Stack>
                ) : null
            }
        </Stack>
    )
}

export default React.memo(AddCourseSection);