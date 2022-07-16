import { CircularProgress, CircularProgressProps } from '@chakra-ui/react'
import React from 'react'

export interface MyCircularProgressProps extends CircularProgressProps{
}

function MyCircularProgress({...props}:MyCircularProgressProps) {
    return (
        <CircularProgress isIndeterminate color='blue.300' thickness={'12px'} {...props} />
    )
}

export default React.memo(MyCircularProgress);
