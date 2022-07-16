import { ButtonGroup, HStack, Skeleton } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { selectFormCourse } from '../../../store/course/form-course.slice'
import FormMsg from '../../../utils/constants/form-message.constant'
import { usePriceTiers } from '../../admin/queries/configuration-query.hook'
import MySelect from '../../shared/components/MySelect'
import SubmitButton from '../../shared/components/SubmitButton'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import ICourse, { ICourseBasicInfo } from '../../shared/interfaces/models/course.interface'
import { RQK_COURSE } from '../hooks/course-query.hook'

interface FormData {
    currency: string
    price: number
}

const vldSchema = yup.object({
    // currency: yup.string().required(FormMsg.required),
    price: yup.number().typeError(FormMsg.required).required(FormMsg.required),
})

function PricingForm() {
    const queryClient = useQueryClient()
    const { onUpdate } = useCrudActions()
    const item = useSelector(selectFormCourse)
    const { isLoading, data: priceTiers } = usePriceTiers()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })
    // PRICE TIERS
    const priceTiersSD = useMemo(() => {
        return priceTiers?.map((item, i) => {
            const money = new Intl.NumberFormat('vi-VN').format(item)
            return {
                label: `${money}đ (tier ${i + 1})`,
                value: item,
            }
        })
    }, [priceTiers])
    //
    useEffect(() => {
        if (!!item) {
            const defaultValues: Partial<FormData> = {
                currency: item.basicInfo.currency,
                price: item.basicInfo.price,
            }
            reset(defaultValues)
        }
    }, [item, reset])
    //
    // const currencyW = watch('currency')
    // useEffect(() => {
    //     const priceTierSD = COURSE_PRICE_TIER_DATA[currencyW]
    //     if (priceTierSD) {
    //         setPriceTierSD(priceTierSD)
    //         setTimeout(() => {
    //             const priceVal = item?.basicInfo.currency != currencyW ? 0 : item.basicInfo.price
    //             setValue('price', priceVal || 0)
    //         })
    //     }
    // }, [currencyW, item?.basicInfo.currency, item?.basicInfo.price, setValue])
    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<ICourse> = {
            basicInfo: {
                price: values.price,
                currency: values.currency,
            } as ICourseBasicInfo,
        }
        try {
            await onUpdate(item!._id, data)
            queryClient.invalidateQueries(RQK_COURSE)
            reset(values)
        } catch (e) {
            console.error(e)
        }
    })
    return (
        <Skeleton isLoaded={!isLoading}>
            <form onSubmit={onSubmit}>
                <HStack align={'start'}>
                    {/* <MySelect
                    options={COURSE_CURRENCY_SELECT_DATA}
                    field="currency"
                    label={'Currency'}
                    register={register}
                    error={errors.currency}
                    showLabelRow={false}
                /> */}
                    <MySelect
                        placeholder="Select Price Tier"
                        options={priceTiersSD}
                        field="price"
                        label={'Price tier'}
                        register={register}
                        error={errors.price}
                        showLabelRow={false}
                    />
                    <ButtonGroup justifyContent={'end'}>
                        <SubmitButton disabled={!isDirty || isSubmitting} />
                    </ButtonGroup>
                </HStack>
            </form>
        </Skeleton>
    )
}

export default React.memo(PricingForm)
