import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import PathHelper from '../../../utils/helpers/path.helper'
import { TCourseFormSection } from '../types/course-form-sectiontype'

export const useCourseFormParams = () => {
    const router = useRouter()
    const { params } = router.query
    const [id, setId] = useState<string>()
    const [section, setSection] = useState<TCourseFormSection>()
    useEffect(() => {
        if (!!params) {
            const [id, section = 'goal'] = params as [string, TCourseFormSection]
            setId(id)
            setSection(section)
            if (!params[1]) {
                router.replace(
                    PathHelper.getCourseFormPath(id, section, router.pathname),
                    undefined,
                    {
                        shallow: true,
                    }
                )
            }
        }
    }, [params, router])
    const state = useMemo(() => {
        return {
            id,
            section,
        }
    }, [id, section])
    return state
}
