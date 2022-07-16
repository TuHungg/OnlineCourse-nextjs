import { Box, GridItem, HStack, Icon, SimpleGrid, StackProps, Text } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import ContentCard from '../../../components/ContentCard'
import { useCourseDetailObjectives } from '../../../queries/course-detail-query.hook'

export interface ObjectiveProps extends StackProps {}
export const Objective = ({ children, ...props }: ObjectiveProps) => {
    return (
        <HStack align="start" spacing={6} {...props}>
            <Box>
                <Icon as={AppIcon.check} />
            </Box>
            <Text flex={1}>{children}</Text>
        </HStack>
    )
}

function CourseObjective() {
    const objectives = useCourseDetailObjectives()
    if (objectives?.length == 0) return <></>
    const objectivesHtml = objectives?.map((content, i) => {
        return (
            <GridItem key={i} colSpan={1}>
                <Objective>{content}</Objective>
            </GridItem>
        )
    })
    return (
        <ContentCard title="What you'll learn" shadow="md">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                {objectivesHtml}
            </SimpleGrid>
        </ContentCard>
    )
}

export default React.memo(CourseObjective)
