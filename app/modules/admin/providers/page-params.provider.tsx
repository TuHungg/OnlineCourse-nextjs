import { createContext, ReactNode, useContext, useState } from 'react'
import { TController, TModel } from '../../../utils/data/data.type'

type TPageParams = {
    ctrlName: TController
    modelName: TModel
}
type TUpdatePageParams = (params: TPageParams) => void
const PageParamsContext = createContext<TPageParams>({} as TPageParams)
const UpdatePageParamsContext = createContext<TUpdatePageParams>({} as TUpdatePageParams)
export const useUpdatePageParams = () => {
    return useContext(UpdatePageParamsContext)
}
export const usePageParams = () => {
    return useContext(PageParamsContext)
}
export default function PageParamsProvider({
    defaultValue,
    children,
}: {
    defaultValue: TPageParams
    children: ReactNode
}) {
    const [params, setParams] = useState<TPageParams>(defaultValue)
    return (
        <PageParamsContext.Provider value={params}>
            <UpdatePageParamsContext.Provider value={setParams}>
                {children}
            </UpdatePageParamsContext.Provider>
        </PageParamsContext.Provider>
    )
}
