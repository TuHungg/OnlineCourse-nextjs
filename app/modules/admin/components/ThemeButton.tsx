import { ButtonProps, Icon, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'
import { FiMoon, FiSun } from 'react-icons/fi'

export interface ThemeButtonProps extends ButtonProps {}

function ThemeButton({ ...props }: ThemeButtonProps) {
    const icon: IconType = useColorModeValue(FiMoon, FiSun)
    const { toggleColorMode } = useColorMode()
    return (
        <IconButton
            aria-label="theme-button"
            onClick={toggleColorMode}
            icon={<Icon as={icon} />}
            {...props}
        />
    )
}

export default React.memo(ThemeButton)
