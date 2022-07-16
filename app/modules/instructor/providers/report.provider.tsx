import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

interface IReportProvider {
    state: {
        reportId?: string
    }
    methods: {}
}
const ReportContext = createContext<IReportProvider>({} as IReportProvider)

export const useReport = () => {
    return useContext(ReportContext)
}

export function ReportProvider({
    reportId: defaultReportId,
    children,
}: {
    reportId?: string
    children: ReactNode
}) {
    const router = useRouter()
    const { params } = router.query
    const id = params?.at(1)
    const [reportId, setReportId] = useState<string | undefined>(defaultReportId || id)

    // update report id
    useEffect(() => {
        setReportId(id)
    }, [reportId, id])

    //
    const state: IReportProvider = useMemo(() => {
        return {
            state: {
                reportId,
            },

            methods: {},
        }
    }, [reportId])
    return <ReportContext.Provider value={state}>{children}</ReportContext.Provider>
}
