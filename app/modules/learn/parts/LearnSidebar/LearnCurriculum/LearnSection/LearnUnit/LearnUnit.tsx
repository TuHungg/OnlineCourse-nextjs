import { Box, Checkbox, HStack, Text, useColorModeValue, useTheme } from '@chakra-ui/react'
import React, { ChangeEventHandler, MouseEventHandler, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    checkIsCompletedUnit,
    completedUnit,
    isActiveUnit,
    selectLearnUnit,
    setActiveContent,
    uncompletedUnit,
} from '../../../../../../../store/course/learn-course.slice'
import LearnLecture from './LearnLecture'
import LearnQuiz from './LearnQuiz'

export interface LearnUnitProps {
    sIdx: number
    uIdx: number
}
function LearnUnit(props: LearnUnitProps) {
    const dispatch = useDispatch()
    const unit = useSelector(selectLearnUnit(props.sIdx, props.uIdx))
    const isActive = useSelector(isActiveUnit(unit?._id || ''))
    const isCompleted = useSelector(checkIsCompletedUnit(unit?._id || ''))
    const renderUnit = useMemo(() => {
        switch (unit?.type) {
            case 'lecture':
                return <LearnLecture sIdx={props.sIdx} uIdx={props.uIdx} />
            default:
                return <LearnQuiz sIdx={props.sIdx} uIdx={props.uIdx} />
        }
    }, [props.sIdx, props.uIdx, unit?.type])
    const theme = useTheme()
    const gray = theme.colors.gray
    const gray300 = useColorModeValue(gray[50], gray[700])
    const onClick: MouseEventHandler<HTMLElement> = (e) => {
        dispatch(
            setActiveContent({
                sIdx: props.sIdx,
                uIdx: props.uIdx,
            })
        )
    }
    const activeBg = useColorModeValue(gray[300], gray[600])
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.checked) {
            dispatch(completedUnit({ unitId: unit?._id! }))
        } else {
            dispatch(uncompletedUnit({ unitId: unit?._id! }))
        }
    }
    return (
        <HStack
            onClick={onClick}
            align={'start'}
            p={4}
            spacing={4}
            w="full"
            sx={{
                '&:hover': {
                    bgColor: !isActive ? gray300 : undefined,
                },
                cursor: 'pointer',
            }}
            bgColor={isActive ? activeBg : undefined}
        >
            <Box pt={1}>
                <Box onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                        onChange={onChange}
                        colorScheme={'purple'}
                        defaultChecked={isCompleted}
                    ></Checkbox>
                </Box>
            </Box>
            <Box flex={1}>{renderUnit}</Box>
        </HStack>
    )
}

export default React.memo(LearnUnit)
