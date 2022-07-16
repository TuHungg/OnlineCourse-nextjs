import {
    Avatar,
    Box,
    FormControl,
    FormHelperText,
    Icon,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react'
import error from 'next/error'
import React, { ChangeEventHandler, MutableRefObject, useEffect, useRef } from 'react'
import { FiEdit2, FiX } from 'react-icons/fi'
import { useImageCropper } from '../hooks/image-cropper.hook'
import MyImageCropperModal from './MyImageCropper/MyImageCropperModal'

export interface EditableAvatarProps {
    initialSrc?: string | null
    field: string
    label: string
    required?: boolean
    helperText?: string
    getImgSrcFuncRef?: MutableRefObject<(() => string | null | undefined) | undefined>
    setAvatarChanged: (val: boolean) => void
}

export default function EditableAvatar({
    setAvatarChanged,
    initialSrc,
    getImgSrcFuncRef,
    helperText = 'Allowed file types: png, jpg, jpeg.',
}: EditableAvatarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    //
    const fileRef = useRef<HTMLInputElement>(null)
    const iconPos = -3
    const {
        state: { src, newSrc },
        methods: { reset },
        events: { onCropped, onFileChange: onIUFileChange },
    } = useImageCropper(initialSrc, getImgSrcFuncRef)

    // CLEAR FILE INPUT
    useEffect(() => {
        if (!isOpen) {
            fileRef.current?.value && (fileRef.current.value = '')
        }
    }, [isOpen])

    const onEditClick = () => {
        fileRef.current?.click()
    }

    const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onIUFileChange(e)
            onOpen()
        }
    }

    const onAvatarCropped = (src: string) => {
        onCropped(src)
        setAvatarChanged(true)
    }

    const onRemoveAvatar = () => {
        setAvatarChanged(true)
        reset()
    }

    return (
        <FormControl isInvalid={!!error}>
            <Box position={'relative'} w="fit-content" borderRadius={5}>
                <Avatar size="2xl" ignoreFallback src={newSrc || src?.toString()} />
                <IconButton
                    onClick={onEditClick}
                    colorScheme={'purple'}
                    pos="absolute"
                    top={iconPos}
                    right={iconPos}
                    aria-label="edit avatar"
                    icon={<Icon as={FiEdit2} />}
                    size="xs"
                />
                <IconButton
                    onClick={onRemoveAvatar}
                    colorScheme={'purple'}
                    pos="absolute"
                    bottom={iconPos}
                    right={iconPos}
                    aria-label="remove avatar"
                    icon={<Icon as={FiX} />}
                    size="xs"
                />
            </Box>
            {helperText && <FormHelperText mt={5}>{helperText}</FormHelperText>}
            <input
                onChange={onFileChange}
                style={{ display: 'none' }}
                ref={fileRef}
                type={'file'}
                accept=".png,.jpg,.jpeg"
            />
            <MyImageCropperModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onCropped={onAvatarCropped}
                title="Crop avatar"
                imageSrc={newSrc}
                size="3xl"
            />
        </FormControl>
    )
}
