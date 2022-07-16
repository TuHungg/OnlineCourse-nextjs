import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { TUnitType } from '../../shared/interfaces/models/course.interface'
import { IUnitAddress } from '../interaces/unit-address.interface'

interface TUnitParamsProvider {
    address: IUnitAddress
    state: {
        isEditContent: boolean
        type: TUnitType
    }
    methods: {
        setEditContent: (val: boolean) => void
        setType: (val: TUnitType) => void
        reset: () => void
    }
    events: {
        dragButtonEvents: any
    }
}
const UnitParamsContext = createContext<TUnitParamsProvider>({} as TUnitParamsProvider)

export const useUnitParams = () => {
    return useContext(UnitParamsContext)
}

export function UnitParamsProvider({
    address,
    unitType: defaultUnitType,
    children,
    dragButtonEvents,
}: {
    address: IUnitAddress
    unitType: TUnitType
    dragButtonEvents?: any
    children?: ReactNode
}) {
    const [isEditContent, setEditContent] = useState<boolean>(false)
    const [unitType, setUnitType] = useState<TUnitType>(defaultUnitType)

    const reset = useCallback(() => {
        setUnitType(defaultUnitType)
        setEditContent(false)
    }, [defaultUnitType])
    //
    const state = useMemo(
        () => ({
            address,
            state: {
                isEditContent,
                type: unitType,
            },

            methods: {
                setEditContent,
                setType: setUnitType,
                reset,
            },
            events: {
                dragButtonEvents,
            },
        }),
        [address, dragButtonEvents, isEditContent, reset, unitType]
    )
    return <UnitParamsContext.Provider value={state}>{children}</UnitParamsContext.Provider>
}
