import { Button, ButtonGroup, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchById } from '../../../../apis/acp/admin.api'
import { CATEGORY_STATUS_SELECT_DATA } from '../../../../utils/data/category.data'
import { TCategoryStatus } from '../../../../utils/data/data.type'
import Helper from '../../../../utils/helpers/helper.helper'
import TypeHelper from '../../../../utils/helpers/type.helper'
import { categoryVldSchema } from '../../../../validations/category.validation'
import { useAuth } from '../../../auth/providers/auth.provider'
import MyInput from '../../../shared/components/MyInput'
import MySelect from '../../../shared/components/MySelect'
import SubmitButton from '../../../shared/components/SubmitButton'
import { useCrudActions } from '../../../shared/hooks/data/crud-actions.hook'
import { useCatPrimarySelectData } from '../../../shared/hooks/models/category.hook'
import { ICategory } from '../../../shared/interfaces/models/category.interface'
import { IHistory } from '../../../shared/interfaces/models/shared.interface'
import PageTitle from '../../components/PageTitle'
import { useFormParams } from '../../hooks/form-params-provider'
import { usePageParams } from '../../providers/page-params.provider'

type FormData = {
    _id?: string
    name: string
    slug: string
    parent?: string
    status: TCategoryStatus
}

export default function CategoryForm() {
    const {
        state: { user },
    } = useAuth()
    const { ctrlName } = usePageParams()
    const { onCreate, onUpdate } = useCrudActions()
    const {
        state: { editingId, isLoading, formType },
        methods: { setLoading, reset: resetFormParams },
    } = useFormParams()
    // INTERNAL STATE
    const [initialValues, setInitialValues] = useState<Partial<FormData>>()
    const [originItem, setOriginItem] = useState<ICategory>()

    // QUERY
    const parentSD = useCatPrimarySelectData({
        select: (items) => items.filter((item) => item.value != originItem?._id),
    })

    // USE FORM
    const defaultValues: FormData = {
        name: '',
        parent: '',
        slug: '',
        status: 'inactive',
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<FormData>({
        defaultValues,
        resolver: yupResolver(categoryVldSchema(initialValues as ICategory)),
    })

    // FETCH DATA
    useEffect(() => {
        if (editingId) {
            fetchById<ICategory>(ctrlName, editingId).then((item) => {
                const values: Partial<FormData> = {
                    _id: item._id,
                    name: item.name,
                    status: item.status,
                    parent: TypeHelper.isCategory(item.parent) ? item.parent._id : undefined,
                    slug: item.slug,
                }
                setOriginItem(item)
                setInitialValues(values)
                reset(values)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlName, editingId])

    //
    const onSubmit = handleSubmit(async (values) => {
        const data: Partial<ICategory> = {
            name: values.name,
            parent: values.parent || null,
            slug: values.slug,
            status: values.status,
            history: { createdBy: user!._id as any } as IHistory,
        }
        if (formType == 'add') {
            await onCreate(data)
            onClear()
        } else {
            const updatedItem = await onUpdate(originItem!._id, data)
            if (updatedItem) {
                setOriginItem(updatedItem)
                setInitialValues(values)
                reset(values)
            }
        }
    })

    const onClear = () => {
        reset(defaultValues)
        setTimeout(() => {
            setValue('status', defaultValues.status)
        })
        setInitialValues(undefined)
        resetFormParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    //
    const nameWatch = watch('name')
    useEffect(() => {
        setValue('slug', Helper.toSlug(nameWatch))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameWatch])
    return (
        <>
            <form onSubmit={onSubmit}>
                <Stack>
                    <PageTitle title={editingId ? 'Edit Category' : 'Add Category'} />
                    <Stack>
                        <MyInput
                            autoFocus
                            required
                            field="name"
                            label={'Name'}
                            register={register}
                            error={errors.name}
                        />
                        <MyInput
                            required
                            field="slug"
                            label={'Slug'}
                            error={errors.slug}
                            register={register}
                        />
                        <MySelect
                            required
                            placeholder="None"
                            field="parent"
                            label={'Parent'}
                            register={register}
                            error={errors.parent}
                            options={parentSD.data}
                        />
                        <MySelect
                            required
                            field="status"
                            label={'Status'}
                            register={register}
                            error={errors.status}
                            options={CATEGORY_STATUS_SELECT_DATA}
                        />
                        {/* // */}
                        <ButtonGroup justifyContent={'left'}>
                            <Button type="reset" onClick={onClear}>
                                Clear
                            </Button>
                            <SubmitButton disabled={!isDirty || isSubmitting} />
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </form>
        </>
    )
}
