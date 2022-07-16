import { Button, HStack, Icon } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import { TUnitType } from '../../../../shared/interfaces/models/course.interface'

export interface AddUnitOptionBarProps {
    setUnitType: (val: TUnitType) => void
}
export default function AddUnitOptionBar(props: AddUnitOptionBarProps) {
    return (
        <HStack spacing={2}>
            <Button onClick={() => props.setUnitType('lecture')} leftIcon={<Icon as={AppIcon.add} />} colorScheme={'purple'} variant={'ghost'}>Lecture</Button>
            <Button onClick={() => props.setUnitType('quiz')} leftIcon={<Icon as={AppIcon.add} />} colorScheme={'purple'} variant={'ghost'}>Quiz</Button>
        </HStack>
    )
}
