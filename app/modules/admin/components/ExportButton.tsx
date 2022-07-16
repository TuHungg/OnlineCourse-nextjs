import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import React from 'react'
import { FaFileExport } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'

export interface ExportButtonProps extends ButtonProps {

}

export default function ExportButton(props: ExportButtonProps) {
    return (
        <Button variant='ghost'  colorScheme={'blue'} leftIcon={<Icon as={FaFileExport} />}  {...props} > Export</Button >
    )
}
