import { ButtonGroup, Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
    selectFormCourseUnitByIds,
    selectSectionNUnitIndex,
    selectFormCourseUnitNo,
    updateLecture,
    addCourseUnit,
} from '../../../../../store/course/form-course.slice'
import { useAppSelector } from '../../../../../store/hooks'
import FormMsg from '../../../../../utils/constants/form-message.constant'
import TypeHelper from '../../../../../utils/helpers/type.helper'
import MyInput from '../../../../shared/components/MyInput'
import { useCrudActions } from '../../../../shared/hooks/data/crud-actions.hook'
import { ICourseUnit } from '../../../../shared/interfaces/models/course.interface'
import ILecture from '../../../../shared/interfaces/models/lecture.interface'
import { IUnitAddress } from '../../../interaces/unit-address.interface'
import CurriculumFormWrapper from '../../CurriculumFormWrapper'

const validateSchema = yup.object({
    title: yup.string().max(80, FormMsg.maxLength).required(FormMsg.required),
})

interface FormData {
    title: string
}

export interface CourseLectureFormProps extends IUnitAddress {
    unitIdx?: number
    formType?: 'edit' | 'add'
    onClose?: () => void
}

export default function CourseLectureForm({
    unitIdx,
    formType = 'edit',
    //
    onClose,
    ...props
}: CourseLectureFormProps) {
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
    const lecture = TypeHelper.isLecture(unit?.lecture) ? unit?.lecture : undefined
    const { onXThunkUpdate } = useCrudActions()
    //
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            title: lecture?.title,
        },
        resolver: yupResolver(validateSchema),
    })
    //
    const onSubmit = handleSubmit((values) => {
        const { title } = values
        onClose && onClose()
        if (formType == 'edit') {
            onXThunkUpdate(updateLecture({ unitAddress: props, data: { title } }))
        } else {
            const data: Partial<ICourseUnit> = {
                lecture: {
                    title,
                } as ILecture,
                type: 'lecture',
            }
            onXThunkUpdate(
                addCourseUnit({ sectionId: props.sectionId, unitIdx: unitIdx!, unit: data })
            )
        }
    })
    const title = formType == 'edit' ? `Lecture ${unitNo}:` : 'Lecture:'
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
