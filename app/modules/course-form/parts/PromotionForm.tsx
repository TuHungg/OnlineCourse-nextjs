import {
    Text,
    ButtonGroup,
    FormControl,
    FormLabel,
    GridItem,
    SimpleGrid,
    Stack,
    Switch,
    HStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { selectFormCourse, updateCourseById } from '../../../store/course/form-course.slice'
import FormMsg from '../../../utils/constants/form-message.constant'
import CoursePrice from '../../client/components/CourseGroup/CoursePrice'
import MyDatePicker from '../../shared/components/MyDatePicker'
import MyFormLabel from '../../shared/components/MyFormLabel'
import MyInput from '../../shared/components/MyInput'
import SubmitButton from '../../shared/components/SubmitButton'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import ICourse, { ICoursePromotions } from '../../shared/interfaces/models/course.interface'

type FormData = {
    enabled: boolean
    discountPrice: number
    startAt: Date
    endAt: Date
}

const vldSchema = yup.object({
    discountPrice: yup.number().typeError(FormMsg.required).nullable(),
    endAt: yup.date().required(),
    startAt: yup.date().required(),
})

export default function PromotionForm() {
    const item = useSelector(selectFormCourse)
    //
    const { onXThunkUpdate } = useCrudActions()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
        setValue,
        control,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })

    const itemStatus = !!item
    // SET DEFAULT VALUE
    useEffect(() => {
        if (!!item) {
            const defaultValues: Partial<FormData> = {
                enabled: item.promotions.enabled,
                discountPrice: item.promotions?.discountPrice,
                startAt: item?.promotions?.startAt ? new Date(item.promotions.startAt) : new Date(),
                endAt: item?.promotions?.startAt ? new Date(item.promotions.startAt) : new Date(),
            }
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemStatus, item?.promotions, reset])

    const onSubmit = handleSubmit(async (values) => {
        let data: Partial<ICourse> = {
            promotions: {
                enabled: values.enabled,
                discountPrice: values.discountPrice,
                startAt: values.startAt.toISOString(),
                endAt: values.endAt.toISOString(),
            },
        }
        await onXThunkUpdate(updateCourseById(data))
        reset(values)
    })
    const enabledWatch = watch('enabled')
    return (
        <form onSubmit={onSubmit}>
            <Stack>
                <FormControl display="flex" alignItems="center">
                    <FormLabel fontWeight={'light'} htmlFor="enable-promotion" mb="0">
                        Enable course Promotion
                    </FormLabel>
                    <Controller
                        control={control}
                        name="enabled"
                        render={({ field }) => {
                            return (
                                <Switch
                                    id="enable-promotion"
                                    isChecked={field.value}
                                    onChange={field.onChange}
                                />
                            )
                        }}
                    />
                </FormControl>
                <Stack display={enabledWatch ? 'flex' : 'none'}>
                    <MyInput
                        autoFocus
                        required
                        field="discountPrice"
                        label={'Discount price'}
                        register={register}
                        type="number"
                        max={item?.basicInfo.price || 0}
                        min={1}
                        error={errors.discountPrice}
                        helperText={`Origin price: ${item?.basicInfo.price}`}
                    />
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <GridItem colSpan={1}>
                            <MyDatePicker
                                label="Start at"
                                control={control}
                                field={'startAt'}
                                showTimeSelect
                            />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <MyDatePicker
                                label="End at"
                                control={control}
                                field={'endAt'}
                                showTimeSelect
                            />
                        </GridItem>
                    </SimpleGrid>
                </Stack>
                <ButtonGroup justifyContent={'end'}>
                    <SubmitButton disabled={!isDirty || isSubmitting} />
                </ButtonGroup>
            </Stack>
        </form>
    )
}
