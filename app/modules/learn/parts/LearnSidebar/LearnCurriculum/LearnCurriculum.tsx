import { Accordion } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    selectActiveSectionIdx,
    selectLearnSections,
} from '../../../../../store/course/learn-course.slice'
import LearnSection from './LearnSection/LearnSection'

function LearnCurriculum() {
    const [indexes, setIndexes] = useState<number[]>([])
    const activeSectionIdx = useSelector(selectActiveSectionIdx)
    const sections = useSelector(selectLearnSections)
    const sectionsHtml = sections?.map((_, i) => <LearnSection key={i} sIdx={i} />)
    useEffect(() => {
        if (activeSectionIdx > -1) {
            setIndexes((indexes) => {
                if (indexes.indexOf(activeSectionIdx) == -1) return indexes.concat(activeSectionIdx)
                return indexes
            })
        }
    }, [activeSectionIdx, setIndexes])
    return (
        <Accordion
            flex={1}
            index={indexes}
            onChange={(val) => setIndexes(val as number[])}
            allowMultiple
            overflow={'auto'}
        >
            {sectionsHtml}
        </Accordion>
    )
}

export default React.memo(LearnCurriculum)
