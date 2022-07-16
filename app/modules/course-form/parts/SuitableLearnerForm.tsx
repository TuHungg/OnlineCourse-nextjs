import { Box, Button, ButtonGroup, Heading, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
    selectFormCourseStatus,
    selectFormCourseSuitableLearners,
    updateCourseById,
} from '../../../store/course/form-course.slice'
import { answerFieldArraySchema } from '../../../validations/answer-field-array.validation'
import MyCircularProgress from '../../shared/components/MyCircularProgress'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import ICourse from '../../shared/interfaces/models/course.interface'
import SortableAnswerCardList from '../components/SortableAnswerCardList/SortableAnswerCardList'
import IAnswerFormData from '../interaces/answer-form-data.inteface'
import { AnswerFieldArrayProvider } from '../providers/answer-field-array.provider'

const formName: string = 'suitable-learner'
const minQty: number = 0
const defaultQty: number = 1
const placeholders: string[] = ['Example: Beginner Python developers curious about data science']

function SuitableLearnerForm() {
    const { onXThunkUpdate } = useCrudActions()
    const status = useSelector(selectFormCourseStatus)
    const suitableLearners = useSelector(selectFormCourseSuitableLearners)

    // FORM HOOK
    const fieldName = 'answers'
    const methods = useForm<IAnswerFormData>({
        resolver: yupResolver(answerFieldArraySchema(0)),
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
        if (suitableLearners?.length || 0 > 0) {
            formData = { answers: suitableLearners?.map((item) => ({ content: item })) || [] }
        } else {
            formData = { answers: [...Array(defaultQty)].map((_) => ({ content: '' })) }
        }
        reset(formData)
    }, [suitableLearners, reset])

    // SUBMIT
    const onSubmit = handleSubmit(async (values) => {
        const strings: string[] = values.answers.map((item) => item.content)
        const data: Partial<ICourse> = {
            details: {
                suitableLearner: strings,
            },
        }
        await onXThunkUpdate(updateCourseById(data))
        reset(values)
    })

    return (
        <FormProvider {...methods}>
            <AnswerFieldArrayProvider
                formName={formName}
                minQty={minQty}
                fieldName={fieldName}
                {...fieldArrayMethods}
            >
                <form onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        <Heading fontSize={'md'}>Who is this course for?</Heading>
                        <Text>
                            Write a clear description of the intended learners for your course who
                            will find your course content valuable. This will help you attract the
                            right learners to your course.
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

export default React.memo(SuitableLearnerForm)
