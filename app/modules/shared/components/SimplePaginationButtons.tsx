import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import AppIcon from '../../../utils/constants/app-icon.constant'
import { useSimplePagination } from '../providers/simple-pagination.provider'

export default function SimplePaginationButtons() {
    const {
        state: { hasNextPage, hasPreviousPage },
        methods: { onNextPage, onPreviousPage },
    } = useSimplePagination()
    return (
        <>
            {hasNextPage || hasPreviousPage ? (
                <ButtonGroup justifyContent={'center'}>
                    <IconButton
                        colorScheme={'purple'}
                        onClick={onPreviousPage}
                        disabled={!hasPreviousPage}
                        aria-label=""
                        icon={<Icon as={AppIcon.arrowLeft} />}
                    />
                    <IconButton
                        colorScheme={'purple'}
                        onClick={onNextPage}
                        disabled={!hasNextPage}
                        aria-label=""
                        icon={<Icon as={AppIcon.arrowRight} />}
                    />
                </ButtonGroup>
            ) : undefined}
        </>
    )
}
