import { Text, HStack, Progress, ProgressProps } from '@chakra-ui/react';
import React from 'react'

export interface MyProgressProps extends ProgressProps {
    value: number
    showVal?: boolean
}

export default function MyProgressBar({ value, showVal = false, ...props }: MyProgressProps) {
    const percent = Math.floor(value);
    return (
        <HStack>
            <Progress flex={1} value={value} size='sm' isAnimated hasStripe colorScheme={'purple'}  {...props} />
            {showVal ? <Text as='strong'>{percent}%</Text> : null}
        </HStack>
    )
}
