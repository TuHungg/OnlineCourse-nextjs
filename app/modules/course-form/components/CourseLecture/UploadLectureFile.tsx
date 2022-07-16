import { HStack, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormMsg from '../../../../utils/constants/form-message.constant'
import FileUploadHelper from '../../../../utils/helpers/file-upload.helper'
import MyInput from '../../../shared/components/MyInput'
import MyProgressBar from '../../../shared/components/MyProgress'
import SubmitButton from '../../../shared/components/SubmitButton'
import { useLectureParams } from '../../providers/lecture-params.provider'

const vldSchema = yup.object({
    name: yup.string().trim(FormMsg.trim).strict(true),
})

export type UploadFileFormData = {
    name: string
    file: FileList
}

export interface UploadLectureFileProps {
    accept: string
    dirPath: string
    onSave: (values: UploadFileFormData, url: string) => Promise<void>
}
export default function UploadLectureFile(props: UploadLectureFileProps) {
    const {
        methods: { updateVideo },
        state: { lecture },
    } = useLectureParams()
    const [uploadProgress, setUploadProgress] = useState<number>()
    //
    //
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        watch,
    } = useForm<UploadFileFormData>({
        resolver: yupResolver(vldSchema),
    })
    const [isFileSelected, setFileSelected] = useState<boolean>(false)
    const onSubmit = handleSubmit(async (values) => {
        const file = values.file[0]
        if (file) {
            await new FileUploadHelper().uploadFile(file, props.dirPath, {
                onProgress: (progress) => {
                    setUploadProgress(progress * 100)
                },
                onComplete: (downloadUrl) => {
                    props.onSave(values, downloadUrl)
                    setUploadProgress(undefined)
                },
            })
        }
    })

    const fileWatch = watch('file')
    useEffect(() => {
        if (!!fileWatch) setFileSelected(true)
    }, [fileWatch])

    return (
        <form onSubmit={onSubmit}>
            <Stack>
                <MyInput
                    field="name"
                    label="File name"
                    placeholder="File name (optional)"
                    register={register}
                    error={errors.name}
                    showLabelRow={false}
                />
                <MyInput
                    field="file"
                    register={register}
                    error={errors.file}
                    type="file"
                    helperText="Note: All files should be at least 720p and less than 4.0 GB."
                    accept={props.accept}
                />
                {uploadProgress && <MyProgressBar value={uploadProgress} showVal />}
                <HStack justify="end">
                    <SubmitButton type="submit" disabled={!isFileSelected || isSubmitting} />
                </HStack>
            </Stack>
        </form>
    )
}
