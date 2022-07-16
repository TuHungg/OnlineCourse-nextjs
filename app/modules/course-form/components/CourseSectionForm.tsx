import { Button, ButtonGroup } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import {
    addCourseSection,
    selectFormCourseSection,
    updateCourseSection,
} from '../../../store/course/form-course.slice'
import FormMsg from '../../../utils/constants/form-message.constant'
import MyInput from '../../shared/components/MyInput'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import CurriculumFormWrapper from './CurriculumFormWrapper'

export const validateSchema = yup.object({
    title: yup.string().max(80, FormMsg.maxLength).required(FormMsg.required),
    objective: yup.string().max(200, FormMsg.maxLength).nullable(),
})

interface FormData {
    title: string
    objective: string
}

export interface CourseSectionFormProps {
    formType?: 'edit' | 'add'
    sectionIndex: number
    onClose?: () => void
}

export default function CourseSectionForm({
    formType = 'edit',
    sectionIndex,
    //
    onClose,
}: CourseSectionFormProps) {
    const section = useSelector(selectFormCourseSection(formType == 'edit' ? sectionIndex : -1))
    const { onXThunkUpdate } = useCrudActions()
    //
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        watch,
    } = useForm<FormData>({
        defaultValues: section
            ? {
                  title: section?.title,
                  objective: section?.objective,
              }
            : {},
        resolver: yupResolver(validateSchema),
    })
    //
    const onSubmit = handleSubmit((values) => {
        onClose && onClose()
        if (formType == 'edit') {
            onXThunkUpdate(updateCourseSection({ sectionId: section!._id, data: values }))
        } else {
            onXThunkUpdate(addCourseSection({ sectionIndex, data: values }))
        }
    })
    return (
        <form onSubmit={onSubmit}>
            <CurriculumFormWrapper label={`New Section`}>
                <MyInput
                    autoFocus
                    required
                    field="title"
                    register={register}
                    error={errors.title}
                    placeholder="Enter a Title"
                    maxLength={80}
                    watch={watch}
                    label={'Title'}
                    showLabelRow={false}
                />
                <MyInput
                    field="objective"
                    register={register}
                    error={errors.objective}
                    placeholder="Enter a Learning Objective"
                    helperText="What will students be able to do at the end of this section?"
                    maxLength={200}
                    watch={watch}
                    label={'Objective'}
                    showLabelRow={false}
                />
                <ButtonGroup justifyContent={'end'}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button colorScheme={'blue'} type="submit" disabled={!isDirty}>
                        Submit
                    </Button>
                </ButtonGroup>
            </CurriculumFormWrapper>
        </form>
    )
}
