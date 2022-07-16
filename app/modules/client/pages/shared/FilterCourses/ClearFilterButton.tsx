import { Button } from '@chakra-ui/react'
import React from 'react'
import { useButtonSize } from '../../../../shared/hooks/button-size.hook'
import { useFilter } from '../../../../shared/hooks/filter.hook'
import { useClientUrlParams } from '../../../hooks/client-url-params.hook'

export default function ClearFilterButton() {
    const query = useClientUrlParams()
    const { reset } = useFilter(query)
    const btnSize = useButtonSize()
    return (
        <Button size={btnSize} ml={2} onClick={reset}>
            Clear Filter
        </Button>
    )
}
