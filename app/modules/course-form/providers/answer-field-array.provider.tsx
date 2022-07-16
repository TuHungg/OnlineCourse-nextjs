import { createContext, ReactNode, useContext, useMemo } from 'react'
import IAnswerFormData from '../interaces/answer-form-data.inteface'
import IFieldArray from '../interaces/field-array.interface'

interface IAnswerFieldArray extends IFieldArray<IAnswerFormData> {
    formName: string
}

interface IAnswerFieldArrayProvider extends IAnswerFieldArray {
    children: ReactNode
}

type TMore = {
    minQty: number
    maxQty?: number
    maxLength?: number
}

const AnswerFieldArrayContext = createContext<IAnswerFieldArray & TMore>(
    {} as IAnswerFieldArray & TMore
)
export const useAnswerFieldArray = () => {
    return useContext(AnswerFieldArrayContext)
}
export const AnswerFieldArrayProvider = ({
    children,
    minQty = 0,
    ...props
}: IAnswerFieldArrayProvider & Partial<TMore>) => {
    const state = useMemo(() => {
        return { minQty, ...props }
    }, [minQty, props])
    return (
        <AnswerFieldArrayContext.Provider value={state}>
            {children}
        </AnswerFieldArrayContext.Provider>
    )
}
