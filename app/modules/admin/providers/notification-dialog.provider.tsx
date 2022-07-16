import { useDisclosure } from '@chakra-ui/react'
import { createContext, useContext, ReactNode, useState, useMemo, useCallback } from 'react'
import { TColorScheme } from '../../shared/types/color-scheme.type'

type TNotificationDialogData = {
    title: string
    content: string | ReactNode
    btnColorScheme?: TColorScheme
}

export type TNotificationDialog = {
    data: TNotificationDialogData
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    onShow: (data: TNotificationDialogData) => void
}

const NotificationDialogContext = createContext<TNotificationDialog>({} as TNotificationDialog)
export const useNotificationDialog = () => {
    return useContext(NotificationDialogContext)
}
export default function NotificationDialogProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<TNotificationDialogData>({} as TNotificationDialogData)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onShow = useCallback(
        (alertData: TNotificationDialogData) => {
            setData(alertData)
            onOpen()
        },
        [onOpen]
    )
    const state = useMemo(
        () => ({
            data,
            onShow,
            isOpen,
            onClose,
            onOpen,
        }),
        [data, isOpen, onClose, onOpen, onShow]
    )
    return (
        <NotificationDialogContext.Provider value={state}>
            {children}
        </NotificationDialogContext.Provider>
    )
}
