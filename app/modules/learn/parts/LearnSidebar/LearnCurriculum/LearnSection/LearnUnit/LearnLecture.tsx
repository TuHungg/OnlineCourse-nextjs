import { Text, Stack, HStack, Icon, useTheme } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    selectLearnLecture,
    selectLearnUnitNo,
} from '../../../../../../../store/course/learn-course.slice'
import AppIcon from '../../../../../../../utils/constants/app-icon.constant'
import DateHelper from '../../../../../../../utils/helpers/date.helper'
import IFile from '../../../../../../shared/interfaces/models/file.interface'
import { LearnUnitProps } from './LearnUnit'

export interface LearnLectureProps extends LearnUnitProps {}
export default function LearnLecture(props: LearnLectureProps) {
    const no = useSelector(selectLearnUnitNo(props.sIdx, props.uIdx))
    const lecture = useSelector(selectLearnLecture(props.sIdx, props.uIdx))
    return (
        <Stack spacing={1}>
            <HStack>
                <Text>{no}.</Text>
                <Text>{lecture?.title}</Text>
            </HStack>
            <HStack justify={'space-between'}>
                <HStack>
                    <Icon as={AppIcon.play} />
                    <Text as="span" fontSize={'xs'}>
                        {DateHelper.getRoundMinute((lecture?.video as IFile)?.duration || 0)} min
                    </Text>
                </HStack>
            </HStack>
        </Stack>
    )
}
