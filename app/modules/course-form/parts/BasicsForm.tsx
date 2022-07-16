import { ButtonGroup, GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { selectFormCourse } from '../../../store/course/form-course.slice'
import { COURSE_IMAGE_DIR } from '../../../utils/constants/firebase.constant'
import FormMsg from '../../../utils/constants/form-message.constant'
import { COURSE_LAN_SELECT_DATA, COURSE_LEVEL_SELECT_DATA } from '../../../utils/data/course.data'
import Helper from '../../../utils/helpers/helper.helper'
import TypeHelper from '../../../utils/helpers/type.helper'
import MyInput from '../../shared/components/MyInput'
import MyProgressBar from '../../shared/components/MyProgress'
import MySelect from '../../shared/components/MySelect'
import SubmitButton from '../../shared/components/SubmitButton'
import { useCrudActions } from '../../shared/hooks/data/crud-actions.hook'
import {
    useCatPrimarySelectData,
    useCatSubSelectData,
} from '../../shared/hooks/models/category.hook'
import { useUploadImage } from '../../shared/hooks/upload-image.hook'
import ICourse, { TCourseLevel } from '../../shared/interfaces/models/course.interface'
import Editor from '../../shared/parts/Editor/Editor'
import { RQK_COURSE } from '../hooks/course-query.hook'
import RecImageUpload from './RecImageUpload'

interface FormData {
    title: string
    slug: string
    subtitle: string
    description: string
    lan: string
    level: TCourseLevel
    category: string
    subCategory: string
}

const vldSchema = yup.object({
    title: yup.string().max(60, FormMsg.maxLength).required(FormMsg.required),
    slug: yup.string().max(60, FormMsg.maxLength).required(FormMsg.required),
    subtitle: yup.string().max(120, FormMsg.maxLength).nullable(),
    description: yup.string().nullable(),
    lan: yup.string().required(FormMsg.required),
    level: yup.string().required(),
    category: yup.string().required(FormMsg.required),
    subCategory: yup.string().nullable(),
})

function BasicsForm() {
    const queryClient = useQueryClient()
    const item = useSelector(selectFormCourse)
    const { handleUpload, uploadProgress, getImgSrcFuncRef } = useUploadImage(
        COURSE_IMAGE_DIR,
        item?.basicInfo.image
    )
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<FormData>({
        resolver: yupResolver(vldSchema),
    })

    useEffect(() => {
        if (!!item) {
            const primaryCat = TypeHelper.isCategory(item?.categories?.[0])
                ? item?.categories?.[0]
                : undefined
            const subCat = TypeHelper.isCategory(item?.categories?.[1])
                ? item?.categories?.[1]
                : undefined
            const defaultValues: Partial<FormData> = {
                title: item?.basicInfo.title,
                slug: item?.basicInfo.slug,
                subtitle: item?.basicInfo.subtitle,
                description: item?.details.description,
                lan: item?.basicInfo.lan,
                level: item?.basicInfo.level,
                category: primaryCat?._id,
                subCategory: subCat?._id,
            }
            reset(defaultValues)
        }
    }, [item, reset])
    const { onUpdate } = useCrudActions()
    //
    const primaryCatWatch = watch('category')
    const catPrimarySD = useCatPrimarySelectData()
    const catSubSD = useCatSubSelectData(primaryCatWatch)

    // SUBMIT
    const onSubmit = handleSubmit(async (values) => {
        handleUpload(async (_, imgSrc) => {
            const cats: string[] = [values.category]
            if (values.subCategory) cats.push(values.subCategory)
            const data: Partial<ICourse> = {
                categories: cats,
                basicInfo: {
                    title: values.title,
                    slug: values.slug,
                    subtitle: values.subtitle,
                    lan: values.lan,
                    level: values.level,
                    image: imgSrc,
                } as any,
                details: {
                    description: values.description,
                },
            }
            await onUpdate(item!._id, data)
            queryClient.invalidateQueries(RQK_COURSE)
            reset(values)
        })
    })

    const subCatWatch = watch('subCategory')
    useEffect(() => {
        if (catSubSD.data) {
            setValue('subCategory', subCatWatch)
        }
    }, [catSubSD.data, setValue, subCatWatch])

    // SLUG
    const titleWatch = watch('title')
    useEffect(() => {
        setValue('slug', Helper.toSlug(titleWatch || ''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [titleWatch])

    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={10}>
                <MyInput
                    autoFocus
                    required
                    field="title"
                    label={'Course title'}
                    register={register}
                    maxLength={60}
                    error={errors.title}
                    watch={watch}
                />
                <MyInput
                    required
                    field="slug"
                    label={'Course slug'}
                    register={register}
                    maxLength={60}
                    error={errors.slug}
                    watch={watch}
                />

                <MyInput
                    field="subtitle"
                    label={'Course subtitle'}
                    register={register}
                    maxLength={120}
                    error={errors.subtitle}
                    watch={watch}
                />
                <SimpleGrid columns={6} spacing={2}>
                    <GridItem
                        colSpan={{
                            base: 6,
                            sm: 3,
                            md: 2,
                        }}
                    >
                        <MySelect
                            options={COURSE_LAN_SELECT_DATA}
                            field="lan"
                            label={'Language'}
                            register={register}
                            error={errors.lan}
                            showLabelRow={false}
                        />
                    </GridItem>
                    <GridItem
                        colSpan={{
                            base: 6,
                            sm: 3,
                            md: 2,
                        }}
                    >
                        <MySelect
                            options={COURSE_LEVEL_SELECT_DATA}
                            field="level"
                            label={'Level'}
                            register={register}
                            error={errors.level}
                            showLabelRow={false}
                        />
                    </GridItem>
                    <GridItem
                        colSpan={{
                            base: 6,
                            md: 2,
                        }}
                    >
                        <Stack spacing={2}>
                            <MySelect
                                field="category"
                                label={'Category'}
                                register={register}
                                error={errors.category}
                                showLabelRow={false}
                                options={catPrimarySD.data || []}
                            />
                            <MySelect
                                field="subCategory"
                                label={'Sub category'}
                                register={register}
                                error={errors.subCategory}
                                showLabelRow={false}
                                options={catSubSD.data || []}
                            />
                        </Stack>
                    </GridItem>
                </SimpleGrid>
                <Editor field="description" label="Description" watch={watch} setValue={setValue} />

                {/* IMAGE UPLOADER */}
                <Stack>
                    <RecImageUpload
                        label="Course image"
                        getImgSrcFuncRef={getImgSrcFuncRef}
                        initialSrc={item?.basicInfo.image?.toString()}
                        description="
                            Upload your course image here. It must meet our course image quality
                            standards to be accepted. Important guidelines: 750x422 pixels; .jpg,
                            .jpeg,. gif, or .png. no text on the image.
                        "
                    />
                    {uploadProgress && <MyProgressBar value={uploadProgress} />}
                </Stack>

                <ButtonGroup justifyContent="end">
                    <SubmitButton type="submit" disabled={!isDirty || isSubmitting} />
                </ButtonGroup>
            </Stack>
        </form>
    )
}

export default React.memo(BasicsForm)
