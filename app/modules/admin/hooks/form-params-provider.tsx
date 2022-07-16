import { useCallback, useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import React, { createContext, ReactNode, useContext } from 'react';

export type TFormType = 'add' | 'edit';
interface FormParamsProvider {
    state: {
        editingId?: string
        formType: TFormType
        isLoading: boolean
    }
    methods: {
        setEditingId: (val?: string) => void
        setLoading: (val: boolean) => void
        reset: () => void
    },
}
const FormParamsContext = createContext<FormParamsProvider>({} as FormParamsProvider);

export const useFormParams = () => {
    return useContext(FormParamsContext);
};

export function FormParamsProvider({ children }: { children: ReactNode; }) {
    const [editingId, setEditingId] = useState<string>();
    const [formType, setFormType] = useState<TFormType>('add');
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (editingId) {
            setFormType('edit')
            setLoading(true)
        } else {
            setFormType('add')
            setLoading(false)
        }
    }, [editingId])
    //
    const reset = useCallback(() => {
        setFormType('add');
        setEditingId(undefined);
    }, []);
    return (
        <FormParamsContext.Provider value={{
            state: {
                editingId,
                formType,
                isLoading
            },
            methods: {
                setEditingId,
                setLoading,
                reset
            }
        }}>
            {children}
        </FormParamsContext.Provider>
    );
}
