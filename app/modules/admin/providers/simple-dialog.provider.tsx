import { useDisclosure } from '@chakra-ui/react'
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { TColorScheme } from '../../shared/types/color-scheme.type'

type TSimpleDialogData = {
    title: string
    content: string | ReactNode
    colorScheme?: TColorScheme
    negativeTitle?: string
    positiveTitle?: string
    onPositive?: () => void
    onNegative?: () => void
}

export type TSimpleDialog = {
    data: TSimpleDialogData
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    onShow: (data: TSimpleDialogData) => void
}

const SimpleDialogContext = createContext<TSimpleDialog>({} as TSimpleDialog)
export const useSimpleDialog = () => {
    return useContext(SimpleDialogContext)
}
export default function SimpleDialogProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<TSimpleDialogData>({} as TSimpleDialogData)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onShow = useCallback(
        (alertData: TSimpleDialogData) => {
            alertData.colorScheme = alertData.colorScheme || 'red'
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
    return <SimpleDialogContext.Provider value={state}>{children}</SimpleDialogContext.Provider>
}
