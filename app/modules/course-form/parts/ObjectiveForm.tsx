import { Box, Button, ButtonGroup, Heading, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
    selectFormCourseObjectives,
    selectFormCourseStatus,
    updateCourseById,
} from '../../../store/course/form-course.slice'
import { answerFieldArraySchema } from '../../../validations/answer-field-array.validation'
import MyCircularProgress from '../../shared/components/MyCircularProgress'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import ICourse from '../../shared/interfaces/models/course.interface'
import SortableAnswerCardList from '../components/SortableAnswerCardList/SortableAnswerCardList'
import IAnswerFormData from '../interaces/answer-form-data.inteface'
import { AnswerFieldArrayProvider } from '../providers/answer-field-array.provider'

const formName: string = 'objective'
const maxLength: number = 150
const minQty: number = 4
const defaultQty: number = 4
const placeholders: string[] = [
    'Example: Define the roles and responsibilities of a project manager',
    'Example: Estimate project timelines and budgets',
    'Example: Identify and manage project risks',
    'Example: Complete a case study to manage a project from conception to completion',
]

function ObjectiveForm() {
    const { onXThunkUpdate } = useCrudActions()
    const status = useSelector(selectFormCourseStatus)
    const objectives = useSelector(selectFormCourseObjectives)

    // FORM HOOK
    const fieldName = 'answers'
    const methods = useForm<IAnswerFormData>({
        resolver: yupResolver(answerFieldArraySchema(minQty)),
    })
    const {
        reset,
        control,
        handleSubmit,
        formState: { isDirty },
    } = methods
    const fieldArrayMethods = useFieldArray<IAnswerFormData>({
        control,
        name: fieldName,
    })

    // UPDATE FORM VALUES
    useEffect(() => {
        let formData: IAnswerFormData
        if (objectives?.length || 0 > 0) {
            formData = { answers: objectives?.map((item) => ({ content: item })) || [] }
        } else {
            formData = { answers: [...Array(defaultQty)].map((_) => ({ content: '' })) }
        }
        reset(formData)
    }, [objectives, reset])

    // SUBMIT
    const onSubmit = handleSubmit(async (values) => {
        const strings: string[] = values.answers.map((item) => item.content)
        const data: Partial<ICourse> = {
            details: {
                objectives: strings,
            },
        }
        await onXThunkUpdate(updateCourseById(data))
        reset(values)
    })

    return (
        <FormProvider {...methods}>
            <AnswerFieldArrayProvider
                formName={formName}
                maxLength={maxLength}
                minQty={minQty}
                fieldName={fieldName}
                {...fieldArrayMethods}
            >
                <form onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        <Heading fontSize={'md'}>What will students learn in your course?</Heading>
                        <Text>
                            You must enter at least 4 learning objectives or outcomes that learners
                            can expect to achieve after completing your course.
                        </Text>
                        <Box pt={6}>
                            {status == 'loading' ? (
                                <MyCircularProgress />
                            ) : (
                                <SortableAnswerCardList placeholders={placeholders} />
                            )}
                        </Box>
                        <ButtonGroup justifyContent={'end'}>
                            <Button disabled={!isDirty} colorScheme={'blue'} type="submit">
                                Submit
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </form>
            </AnswerFieldArrayProvider>
        </FormProvider>
    )
}

export default React.memo(ObjectiveForm)
