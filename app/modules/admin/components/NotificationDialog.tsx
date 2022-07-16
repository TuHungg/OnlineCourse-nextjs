import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import React from "react";
import { useNotificationDialog } from "../providers/notification-dialog.provider";

export default function NotificationDialog() {
    const { data, isOpen, onClose } = useNotificationDialog()
    const { title, content, btnColorScheme = 'teal' } = data;
    const cancelRef = React.useRef(null)
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>{title}</AlertDialogHeader>
                        <AlertDialogBody>{content}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme={btnColorScheme} onClick={onClose} ml={3}>Got it</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}