import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import MyCircularProgress from '../../shared/components/MyCircularProgress'

export default function SavingProgress() {
    const color = useColorModeValue('black', 'whiteSmoke');
    const bg = useColorModeValue('gray.200', 'black');
    return (
        <MyCircularProgress size='30px' color={color} trackColor={bg} />
    )
}
