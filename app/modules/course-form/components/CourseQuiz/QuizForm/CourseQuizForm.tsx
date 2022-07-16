import { Button, ButtonGroup } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
    addCourseUnit,
    selectFormCourseUnitByIds,
    selectFormCourseUnitNo,
    selectSectionNUnitIndex,
    updateQuiz,
} from '../../../../../store/course/form-course.slice'
import { useAppSelector } from '../../../../../store/hooks'
import FormMsg from '../../../../../utils/constants/form-message.constant'
import TypeHelper from '../../../../../utils/helpers/type.helper'
import MyInput from '../../../../shared/components/MyInput'
import { useCrudActions } from '../../../../shared/hooks/data/crud-actions.hook'
import { ICourseUnit } from '../../../../shared/interfaces/models/course.interface'
import IQuiz from '../../../../shared/interfaces/models/quiz.interface'
import Editor from '../../../../shared/parts/Editor/Editor'
import { IUnitAddress } from '../../../interaces/unit-address.interface'
import CurriculumFormWrapper from '../../CurriculumFormWrapper'

const validateSchema = yup.object({
    title: yup.string().max(80, FormMsg.maxLength).required(FormMsg.required),
    description: yup.string().nullable(),
})

interface FormData {
    title: string
    description?: string
}

export interface CourseQuizFormProps extends IUnitAddress {
    unitIdx?: number
    formType?: 'edit' | 'add'
    onClose?: () => void
}

export default function CourseQuizForm({
    unitIdx,
    formType = 'edit',
    //
    onClose,
    ...props
}: CourseQuizFormProps) {
    const unit = useAppSelector((state) =>
        formType == 'edit'
            ? selectFormCourseUnitByIds(props.sectionId, props.unitId)(state)
            : undefined
    )
    unitIdx = useAppSelector((state) =>
        formType == 'edit'
            ? selectSectionNUnitIndex(props.sectionId, props.unitId)(state)[1]
            : unitIdx!
    )
    const unitNo = useAppSelector((state) =>
        formType == 'edit'
            ? selectFormCourseUnitNo(props.sectionId, props.unitId)(state)
            : undefined
    )
    const quiz = TypeHelper.isQuiz(unit?.quiz) ? unit?.quiz : undefined
    const { onXThunkUpdate } = useCrudActions()
    //
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        watch,
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            title: quiz?.title,
            description: quiz?.description,
        },
        resolver: yupResolver(validateSchema),
    })
    //
    const onSubmit = handleSubmit((values) => {
        const { title, description } = values
        onClose && onClose()
        if (formType == 'edit') {
            onXThunkUpdate(updateQuiz({ unitAddress: props, data: { title, description } }))
        } else {
            const data: Partial<ICourseUnit> = {
                quiz: {
                    title,
                    description,
                } as IQuiz,
                type: 'quiz',
            }
            onXThunkUpdate(
                addCourseUnit({ sectionId: props.sectionId, unitIdx: unitIdx!, unit: data })
            )
        }
    })
    const title = formType == 'edit' ? `Quiz ${unitNo}:` : 'Quiz:'
    return (
        <form onSubmit={onSubmit}>
            <CurriculumFormWrapper label={title} border="none">
                <MyInput
                    required
                    field="title"
                    register={register}
                    error={errors.title}
                    autoFocus
                    placeholder="Enter a Title"
                    maxLength={80}
                    watch={watch}
                    showLabelRow={false}
                />
                <Editor
                    watch={watch}
                    field="description"
                    setValue={setValue}
                    placeholder="Quiz Description"
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
