import { Badge, Button, ButtonProps, HStack, Icon } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons/lib'

export interface IconButtonWithNumberProps extends ButtonProps {
    icon: IconType
    number?: number
}
export default function IconButtonWithNumber({
    icon,
    number,
    ...props
}: IconButtonWithNumberProps) {
    return (
        <Button variant={'ghost'} {...props}>
            <HStack justify={'center'}>
                <Icon as={icon} />
                {!!number && <Badge colorScheme={'purple'}>{number}</Badge>}
            </HStack>
        </Button>
    )
}
