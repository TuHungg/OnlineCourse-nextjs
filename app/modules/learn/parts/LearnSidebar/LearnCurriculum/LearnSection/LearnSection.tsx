import {
    Text,
    AccordionItem,
    AccordionButton,
    HStack,
    AccordionIcon,
    AccordionPanel,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectLearnSection } from '../../../../../../store/course/learn-course.slice'
import { useBorderColor } from '../../../../../shared/hooks/style.hook'
import LearnUnit from './LearnUnit/LearnUnit'

const genTitle = (idx: number, title?: string) => {
    return `Section ${idx + 1}: ${title}`
}

function LearnSection(props: { sIdx: number }) {
    const section = useSelector(selectLearnSection(props.sIdx))
    const unitsHtml = section?.units.map((item, i) => (
        <LearnUnit key={i} sIdx={props.sIdx} uIdx={i} />
    ))
    const title = genTitle(props.sIdx, section?.title)
    const accordionItemColor = useColorModeValue('gray.100', 'gray.700')
    return (
        <AccordionItem>
            <AccordionButton bgColor={accordionItemColor} className="no-focus-shadow">
                <Stack w="full" alignItems={'start'} spacing={1} py={2}>
                    <HStack w="full">
                        <Text as="strong" flex={1} textAlign="left" fontSize="md">
                            {title}
                        </Text>
                        <HStack fontSize={'sm'}>
                            {/* <Text>{section?.units.length}</Text>
                        <Text>-</Text>
                        <Text>41 min</Text> */}
                        </HStack>
                        <AccordionIcon />
                    </HStack>
                    {/* <Text fontSize={'sm'}>3/5 | 26 min</Text> */}
                </Stack>
            </AccordionButton>
            <AccordionPanel p={0}>
                <Stack spacing={0}>{unitsHtml}</Stack>
            </AccordionPanel>
        </AccordionItem>
    )
}

export default React.memo(LearnSection)
