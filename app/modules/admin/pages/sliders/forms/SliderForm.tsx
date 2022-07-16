import { Button, ButtonGroup, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchById } from '../../../../../apis/acp/admin.api'
import FieldLabel from '../../../../../utils/constants/field-label.constant'
import { SLIDER_dir } from '../../../../../utils/constants/firebase.constant'
import lan from '../../../../../utils/constants/lan.constant'
import { USER_STATUS_SELECT_DATA } from '../../../../../utils/data/user.data'
import Helper from '../../../../../utils/helpers/helper.helper'
import { sliderVldSchema } from '../../../../../validations/slider.validation'
import RecImageUpload from '../../../../course-form/parts/RecImageUpload'
import MyCircularProgress from '../../../../shared/components/MyCircularProgress'
import MyInput from '../../../../shared/components/MyInput'
import MyProgressBar from '../../../../shared/components/MyProgress'
import MySelect from '../../../../shared/components/MySelect'
import { useCrudActions } from '../../../../shared/hooks/data/crud-actions.hook'
import { useUploadImage } from '../../../../shared/hooks/upload-image.hook'
import ISlider, { TSliderStatus } from '../../../../shared/interfaces/models/slider.interface'
import { useAppDialog } from '../../../providers/app-dialog.provider'
import { usePageParams } from '../../../providers/page-params.provider'

type FormData = {
    _id?: string
    name: string
    status: TSliderStatus
    description?: string
    picture?: string | null
}

export default function SliderForm(props: { id?: string }) {
    const { ctrlName } = usePageParams()

    const { onCreate, onUpdate } = useCrudActions()
    const { onClose } = useAppDialog()
    //
    const [loading, setLoading] = useState<boolean>(true)
    const [item, setItem] = useState<ISlider>()
    const [initialValues, setInitialValues] = useState<FormData>()
    const { handleUpload, uploadProgress, getImgSrcFuncRef } = useUploadImage(
        SLIDER_dir,
        item?.picture
    )

    // FORM HOOKS
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(sliderVldSchema(initialValues as any)),
    })

    // FORM TYPE
    useEffect(() => {
        if (!!props.id) {
            fetchById<ISlider>('sliders', props.id).then((item) => {
                const values: FormData = {
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    status: item.status,
                    picture: item.picture,
                }
                setItem(item)
                setInitialValues(values)
                reset(values)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlName, props.id])

    // ON SUBMIT
    const onSubmit = handleSubmit(async (values) => {
        handleUpload(async (_, imgSrc) => {
            const data: Partial<ISlider> = {
                name: values.name,
                description: values.description,
                picture: imgSrc,
                status: values.status,
            }
            if (!props.id) {
                await onCreate(data)
                onClose()
            } else {
                const updatedItem = await onUpdate(item!._id, data)
                if (updatedItem) {
                    setItem(updatedItem)
                    setInitialValues(values)
                    reset(values)
                }
            }
        })
    })

    return (
        <>
            {!loading ? (
                <form onSubmit={onSubmit}>
                    <VStack align="stretch" spacing={10}>
                        <VStack align="stretch" spacing={4}>
                            <RecImageUpload
                                containerRatio={[3, 2]}
                                aspectRatio={3.35}
                                label="Slider"
                                getImgSrcFuncRef={getImgSrcFuncRef}
                                initialSrc={item?.picture?.toString()}
                            />
                            <MyInput
                                required
                                field="name"
                                label="Name"
                                register={register}
                                error={errors.name}
                                autoFocus
                            />

                            <MyInput
                                required
                                field="description"
                                label="Description"
                                register={register}
                                error={errors.description}
                            />

                            <MySelect
                                required
                                placeholder={`${Helper.lodash.upperFirst(lan.SELECT)} ${
                                    FieldLabel['user.status']
                                }`}
                                field="status"
                                label={FieldLabel['user.status']}
                                register={register}
                                error={errors.status}
                                options={USER_STATUS_SELECT_DATA}
                            />
                            {/* == */}
                            {uploadProgress && <MyProgressBar value={uploadProgress} />}
                        </VStack>
                        <ButtonGroup justifyContent={'end'}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                colorScheme={'blue'}
                                type="submit"
                                disabled={!isDirty || isSubmitting}
                            >
                                Submit
                            </Button>
                        </ButtonGroup>
                    </VStack>
                </form>
            ) : (
                <HStack justify={'center'}>
                    <MyCircularProgress />
                </HStack>
            )}
        </>
    )
}
