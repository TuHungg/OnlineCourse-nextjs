import {
    BoxProps,
    Button,
    ButtonGroup,
    Heading,
    Icon,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import { SelectOption } from '../../../shared/components/MultiSelect'
import { useDeepCompareEffect } from '../../../shared/hooks/app.hook'
import { IFilter, useFilter } from '../../../shared/hooks/filter.hook'
import { useAdminUrlParams } from '../../providers/admin-query.provider'
import FilterItem, { FilterItemProps } from './FilterItem'

export interface FilterProps extends BoxProps {
    data: FilterItemProps[]
}

function Filter({ data }: FilterProps) {
    const [filters, setFilters] = useState<IFilter>({} as IFilter)
    const query = useAdminUrlParams()
    const { filters: clientFilters, updateFilters } = useFilter(query)
    // print data
    useDeepCompareEffect(() => {
        setFilters(clientFilters)
    }, [clientFilters])

    const filterItemsHtml = data.map((item) => {
        return (
            <FilterItem
                key={item.field}
                selectedValues={filters[item.field]}
                field={item.field}
                label={item.label}
                options={item.options}
                onChange={(options: SelectOption[]) => {
                    setFilters((filters) => {
                        return {
                            ...filters,
                            [item.field]: options.map(({ value }) => value),
                        }
                    })
                }}
            />
        )
    })
    const onSubmit = (e: any) => {
        e.preventDefault()
        updateFilters(filters!)
    }
    return (
        <Popover placement={'bottom-end'}>
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        <Button
                            colorScheme="blue"
                            variant="ghost"
                            leftIcon={<Icon as={FiFilter} />}
                        >
                            Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        _focus={{}}
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;',
                        }}
                        w={{
                            base: '400px',
                            md: '500px',
                        }}
                        maxW={{ base: '300px', sm: 'unset' }}
                        border={0}
                    >
                        <PopoverHeader p={{ base: 3, lg: 5 }}>
                            <Heading fontSize="md">Filter Options</Heading>
                        </PopoverHeader>
                        <PopoverBody p={{ base: 3, lg: 5 }}>
                            <form
                                onSubmit={(e: any) => {
                                    onClose()
                                    onSubmit(e)
                                }}
                            >
                                <VStack spacing={2} align="stretch">
                                    {filterItemsHtml}
                                    <ButtonGroup
                                        spacing="2"
                                        justifyContent={'end'}
                                        pt={{ base: 5, lg: 10 }}
                                    >
                                        <Button onClick={onClose} variant="outline">
                                            Cancel
                                        </Button>
                                        <Button type="submit" colorScheme="blue">
                                            Save
                                        </Button>
                                    </ButtonGroup>
                                </VStack>
                            </form>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    )
}
export default React.memo(Filter)
