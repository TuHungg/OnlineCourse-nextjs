import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { useAppDialog } from '../../admin/providers/app-dialog.provider'

export default function AppDialog() {
    const {
        data: { title, body, footer, size, contentSx },
        isOpen,
        onClose,
    } = useAppDialog()
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={size} blockScrollOnMount={true}>
                <ModalOverlay />
                <ModalContent pb={10} sx={contentSx}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir={'column'}>
                        {body}
                    </ModalBody>
                    {footer && <ModalFooter>{footer}</ModalFooter>}
                </ModalContent>
            </Modal>
        </>
    )
}
