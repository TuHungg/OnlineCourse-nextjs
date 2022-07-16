import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TSize } from '../../types/size.type'
import MyImageCropper from './MyImageCropper'

export interface MyImageCropperModalProps {
    title?: string
    imageSrc?: string | null
    onCropped?: (imageSrc: string) => void
    onCancel?: () => void
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    size: TSize
}

export default function MyImageCropperModal({
    title = 'Image cropper',
    imageSrc,
    onCropped,
    isOpen,
    onOpen,
    onClose,
    size = 'lg',
    ...props
}: MyImageCropperModalProps) {
    const childFuncRef = useRef<() => string>()

    const onDoneClick = useCallback(async () => {
        onClose()
        const url = childFuncRef.current && childFuncRef.current()
        onCropped && onCropped(url!)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onCropped])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} {...props}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {imageSrc && (
                        <MyImageCropper childFuncRef={childFuncRef} imageSrc={imageSrc} circle />
                    )}
                </ModalBody>
                <ModalFooter justifyContent={'center'}>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        {' '}
                        Close{' '}
                    </Button>
                    <Button onClick={onDoneClick} variant="ghost">
                        Done
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
