import { useDisclosure } from '@chakra-ui/react'
import { SxProps } from 'chakra-react-select'
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { useIgnoreFirstEffect } from '../../shared/hooks/use-ignore-first-effect'
import { TSize } from '../../shared/types/size.type'

export interface IAppDialogData {
    title?: string
    body: ReactNode
    footer?: ReactNode
    size?: TSize
    contentSx?: SxProps
}

export type TAppDialog = {
    data: IAppDialogData
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    onShow: (data: IAppDialogData) => void
}

const AppDialogContext = createContext<TAppDialog>({} as TAppDialog)
export const useAppDialog = () => {
    return useContext(AppDialogContext)
}
export default function AppDialogProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<IAppDialogData>({} as IAppDialogData)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useIgnoreFirstEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen])

    const reset = useCallback(() => {
        setData({
            body: undefined,
        })
    }, [])

    const onShow = useCallback(
        (alertData: IAppDialogData) => {
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
    return <AppDialogContext.Provider value={state}>{children}</AppDialogContext.Provider>
}
