import { Button, ButtonProps, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { useDevice } from '../hooks/app.hook'

export interface ResponsiveButtonProps extends ButtonProps {
    icon: IconType,
}
export default function RButton({ icon, children, ...props }: ResponsiveButtonProps) {
    const { isMobile } = useDevice();
    return (
        <>
            {
                isMobile
                    ? <IconButton aria-label={children?.toString() || ''} icon={<Icon as={icon} />} {...props}></IconButton>
                    : <Button colorScheme={'blue'} leftIcon={<Icon as={icon} />} {...props}>{children}</Button>
            }
        </>
    )
}
