import {
    Text,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Heading,
    HStack,
    CircularProgress,
    CircularProgressLabel,
    useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { countCompletedUnit, countTotalUnit } from '../../../../store/course/learn-course.slice'

export default function LearnProgress() {
    const total = useSelector(countTotalUnit)
    const completed = useSelector(countCompletedUnit)
    let percent =
        completed != undefined && total != undefined ? Math.floor((completed / total) * 100) : 0
    const progressColor = useColorModeValue('purple.500', 'purple.300')
    return (
        <Popover>
            <PopoverTrigger>
                <HStack>
                    <CircularProgress value={percent} size="45px" color={progressColor}>
                        <CircularProgressLabel>{percent}%</CircularProgressLabel>
                    </CircularProgress>
                    <Button size="sm" className="no-focus-shadow">
                        Your progress
                    </Button>
                </HStack>
            </PopoverTrigger>
            <PopoverContent maxW="200px">
                <PopoverArrow />
                <PopoverBody>
                    <Heading fontSize="md" textAlign={'center'}>
                        {completed} of {total} complete.
                    </Heading>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
