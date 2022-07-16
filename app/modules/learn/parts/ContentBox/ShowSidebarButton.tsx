import { Text, Button, Icon } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import { useSidebar } from '../../../shared/providers/sidebar.provider'

export default function ShowSidebarButton() {
    const { onOpen } = useSidebar()
    return (
        <Button
            color="whitesmoke"
            colorScheme={'blackAlpha'}
            onClick={onOpen}
            pos={'absolute'}
            right={'-130px'}
            top={'10px'}
            leftIcon={<Icon as={AppIcon.arrowLeft} />}
            sx={{
                transition: 'transform .3s',
                '&:hover': {
                    transform: 'translateX(-130px)',
                    '.button-content': {
                        opacity: 1,
                    },
                },
            }}
        >
            <Text
                as="span"
                className="button-content"
                opacity={0}
                sx={{
                    transition: 'opacity .3s',
                }}
            >
                Show curriculum
            </Text>
        </Button>
    )
}
