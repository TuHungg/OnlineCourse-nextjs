import { Box, Button, ButtonGroup, Heading, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
    selectFormCourseRequirements,
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

const formName = 'requirement'
const minQty: number = 0
const defaultQty: number = 1
const placeholders: string[] = [
    'Example: No programming experience needed. You will learn everything you need to know',
]

function RequirementForm() {
    const { onXThunkUpdate } = useCrudActions()
    const status = useSelector(selectFormCourseStatus)
    const requirements = useSelector(selectFormCourseRequirements)

    // FORM HOOK
    const fieldName = 'answers'
    const methods = useForm<IAnswerFormData>({
        resolver: yupResolver(answerFieldArraySchema(0)),
    })
    const {
        reset,
        control,
        handleSubmit,
        formState: { isDirty, dirtyFields },
    } = methods
    const fieldArrayMethods = useFieldArray<IAnswerFormData>({
        control,
        name: fieldName,
    })

    // UPDATE FORM VALUES
    useEffect(() => {
        let formData: IAnswerFormData
        if (requirements?.length || 0 > 0) {
            formData = { answers: requirements?.map((item) => ({ content: item })) || [] }
        } else {
            formData = { answers: [...Array(defaultQty)].map((_) => ({ content: '' })) }
        }
        reset(formData)
    }, [requirements, reset])

    // SUBMIT
    const onSubmit = handleSubmit(async (values) => {
        const strings: string[] = values.answers.map((item) => item.content)
        const data: Partial<ICourse> = {
            details: {
                requirements: strings,
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
                        <Heading fontSize={'md'}>
                            What are the requirements or prerequisites for taking your course?
                        </Heading>
                        <Text>
                            List the required skills, experience, tools or equipment learners should
                            have prior to taking your course. If there are no requirements, use this
                            space as an opportunity to lower the barrier for beginners.
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

export default React.memo(RequirementForm)
