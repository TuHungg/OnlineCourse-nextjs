import { useColorModeValue, useTheme } from '@chakra-ui/react'
import update from 'immutability-helper'
import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

export interface MyNumberFormatProps extends NumberFormatProps {}
export default function MyNumberFormat({ style = {}, ...props }: MyNumberFormatProps) {
    const theme = useTheme()
    const bg = useColorModeValue('white', theme.colors.gray[700])
    style = update(style, {
        $merge: {
            background: bg,
            transition: 'background-color .2s',
        },
    })
    return <NumberFormat style={style} {...props} />
}
