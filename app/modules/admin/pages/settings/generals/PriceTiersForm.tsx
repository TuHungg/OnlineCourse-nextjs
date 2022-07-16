import {
    Button,
    ButtonGroup,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import FormMsg from '../../../../../utils/constants/form-message.constant'
import NotifyHelper from '../../../../../utils/helpers/notify.helper'
import SubmitButton from '../../../../shared/components/SubmitButton'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import IConfiguration from '../../../../shared/interfaces/models/configuration.interface'
import {
    useConfigurationQuery,
    useUpdateConfiguration,
} from '../../../queries/configuration-query.hook'

const vldSchema = yup.object({
    priceTiers: yup.array().min(3, FormMsg.minQty({ qty: 3 })),
})

type FormData = {
    priceTiers: {
        value: number
    }[]
}
export default function PriceTiersForm() {
    const toast = useAppToast()
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
        defaultValues: {
            priceTiers: [],
        },
    })
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'priceTiers', // unique name for your Field Array
    })
    //
    const { isLoading, data } = useConfigurationQuery()
    const { mutate: updateConfiguration } = useUpdateConfiguration()

    useEffect(() => {
        if (!!data) {
            const formData: FormData = {
                priceTiers: data.course.priceTiers.map((item) => ({ value: item })),
            }
            reset(formData)
        }
    }, [data, reset])

    //
    const renderItem = useCallback(
        (field: Record<'id', string>, index: number) => {
            return (
                <HStack key={field.id} spacing={0}>
                    <Text minW={'75px'}>Tier {index + 1}</Text>
                    <InputGroup>
                        <Input
                            required
                            {...register(`priceTiers.${index}.value`)}
                            type={'number'}
                            min={1000}
                            max={10000000}
                        />
                        <InputRightElement>
                            <IconButton
                                onClick={() => remove(index)}
                                variant="ghost"
                                aria-label=""
                                size="sm"
                                icon={<Icon as={AppIcon.delete} />}
                            />
                        </InputRightElement>
                    </InputGroup>
                </HStack>
            )
        },
        [register, remove]
    )

    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<IConfiguration> = {
            course: {
                priceTiers: values.priceTiers.map((item) => Number.parseInt(item.value + '')),
            },
        }
        updateConfiguration(data, {
            onSuccess: (_) => {
                toast(NotifyHelper.success('Configuration updated'))
            },
            onError: (_) => {
                toast(NotifyHelper.somethingWentWrong)
            },
        })
    })

    const errorMessage = (errors.priceTiers as any)?.message
    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={4}>
                <Heading fontSize={'xl'}>Price Tiers</Heading>

                <Skeleton isLoaded={!isLoading}>
                    <HStack justify={'start'}>
                        <Stack flex={1}>
                            {!!errorMessage && (
                                <HStack justify={'end'}>
                                    <Text color={'red'} fontSize={'sm'}>
                                        Price Tiers {errorMessage}
                                    </Text>
                                </HStack>
                            )}
                            <ButtonGroup justifyContent={'end'}></ButtonGroup>
                            {fields.map(renderItem)}
                            <ButtonGroup justifyContent={'space-between'} pl="75px">
                                <Button
                                    onClick={() => append({ value: undefined })}
                                    colorScheme={'purple'}
                                    leftIcon={<Icon as={AppIcon.add} />}
                                    size="sm"
                                >
                                    Add
                                </Button>
                                <SubmitButton disabled={!isDirty || isSubmitting} size={'sm'} />
                            </ButtonGroup>
                        </Stack>
                    </HStack>
                </Skeleton>
            </Stack>
        </form>
    )
}
