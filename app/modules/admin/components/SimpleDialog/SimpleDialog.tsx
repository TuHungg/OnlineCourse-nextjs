import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import React from 'react'
import { useSimpleDialog } from '../../providers/simple-dialog.provider'

export default function SimpleDialog() {
    const { data, isOpen, onClose } = useSimpleDialog()
    const {
        title,
        content,
        onPositive,
        onNegative,
        positiveTitle = 'Yes',
        negativeTitle = 'Cancel',
    } = data
    const cancelRef = React.useRef(null)
    return (
        <>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {title}
                        </AlertDialogHeader>
                        <AlertDialogBody>{content}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={() => {
                                    onNegative && onNegative()
                                    onClose()
                                }}
                            >
                                {negativeTitle}
                            </Button>
                            <Button
                                colorScheme={data.colorScheme}
                                onClick={() => {
                                    onPositive && onPositive()
                                    onClose()
                                }}
                                ml={3}
                            >
                                {positiveTitle}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
