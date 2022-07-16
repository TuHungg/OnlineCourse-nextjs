import { Stack, Button, Icon, ButtonGroup, HStack, Box } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateLecture } from '../../../../store/course/form-course.slice'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import Helper from '../../../../utils/helpers/helper.helper'
import CancelButton from '../../../shared/components/CancelButton'
import SubmitButton from '../../../shared/components/SubmitButton'
import { useCrudActions } from '../../../shared/hooks/data/crud-actions.hook'
import Editor from '../../../shared/parts/Editor/Editor'
import { useLectureParams } from '../../providers/lecture-params.provider'
import { useUnitParams } from '../../providers/unit-params.provider'

type DescriptionFormData = {
    description?: string
}

const DescriptionEditor = (props: { setEditMode: (val: boolean) => void }) => {
    const { address } = useUnitParams()
    const {
        state: { lecture },
    } = useLectureParams()
    const { onXThunkUpdate } = useCrudActions()
    //
    const {
        watch,
        setValue,
        formState: { isDirty, isSubmitting },
        handleSubmit,
        getFieldState,
    } = useForm<DescriptionFormData>({
        defaultValues: {
            description: lecture.description,
        },
    })
    //
    const onCancel = () => {
        props.setEditMode(false)
    }
    const onSubmit = handleSubmit((values) => {
        onXThunkUpdate(
            updateLecture({
                unitAddress: address,
                data: {
                    description: values.description,
                },
            })
        )
        props.setEditMode(false)
    })
    return (
        <form onSubmit={onSubmit}>
            <Stack>
                <Editor
                    setValue={setValue as any}
                    watch={watch}
                    label="Description"
                    field="description"
                />
                <ButtonGroup justifyContent={'end'}>
                    <CancelButton size="sm" onClick={onCancel} />
                    <SubmitButton disabled={!isDirty || isSubmitting} size={'sm'} />
                </ButtonGroup>
            </Stack>
        </form>
    )
}

const DescriptionContent = (props: { content?: string; setEditMode: (val: boolean) => void }) => {
    return (
        <Box
            onClick={() => props.setEditMode(true)}
            sx={{
                '&:hover': {
                    shadow: '1px 1px silver,-1px -1px silver, 1px -1px silver, -1px 1px silver',
                    cursor: 'pointer',
                },
            }}
            px={2}
            pb={4}
        >
            <div dangerouslySetInnerHTML={{ __html: props.content || '' }}></div>
        </Box>
    )
}

function LectureDescription() {
    const {
        state: { lecture },
    } = useLectureParams()
    const [editMode, setEditMode] = useState<boolean>(false)
    const isDescriptionEmpty = Helper.cvtHtmlToText(lecture.description).trim() == ''
    return (
        <Stack>
            {!editMode ? (
                !isDescriptionEmpty ? (
                    <DescriptionContent content={lecture.description} setEditMode={setEditMode} />
                ) : (
                    <HStack>
                        <Button
                            onClick={() => setEditMode(true)}
                            size="sm"
                            colorScheme={'blue'}
                            leftIcon={<Icon as={AppIcon.add} />}
                        >
                            Description
                        </Button>
                    </HStack>
                )
            ) : (
                <DescriptionEditor setEditMode={setEditMode} />
            )}
        </Stack>
    )
}

export default React.memo(LectureDescription)
