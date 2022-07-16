import {
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { FRONTEND_DOMAIN } from '../../../../utils/constants/app.constant'
import PathHelper from '../../../../utils/helpers/path.helper'
import { useAppDialog } from '../../providers/app-dialog.provider'

export function ViewInstructorDialog() {
    const {
        data: { title, body, footer, size },
        isOpen,
        onClose,
    } = useAppDialog()
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'full'} blockScrollOnMount={true}>
                <ModalOverlay />
                <ModalContent
                    pb={10}
                    sx={{
                        bgColor: 'rgba(22,45,61,.66)',
                    }}
                >
                    <ModalHeader color="whitesmoke">
                        <HStack justify={'center'} spacing={8}>
                            <Text>{title}</Text>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton color={'whitesmoke'} />
                    <ModalBody display="flex" flexDir={'column'}>
                        {body}
                    </ModalBody>
                    {footer && <ModalFooter>{footer}</ModalFooter>}
                </ModalContent>
            </Modal>
        </>
    )
}

export interface ViewInstructorProps {
    instructorId: string
}
export default function ViewInstructor(props: ViewInstructorProps) {
    return (
        <iframe
            src={
                FRONTEND_DOMAIN +
                PathHelper.getInstructorPath('courses') +
                `?viewInstructorId=${props.instructorId}`
            }
            style={{ flex: 1 }}
        />
    )
}
