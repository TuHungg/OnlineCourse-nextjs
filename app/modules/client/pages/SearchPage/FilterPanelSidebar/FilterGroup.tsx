import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    Heading,
    HStack,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from '@chakra-ui/react'
import React, { ChangeEventHandler, ReactNode } from 'react'
import { useFilter } from '../../../../shared/hooks/filter.hook'
import { useSubtitleColor } from '../../../../shared/hooks/style.hook'
import { useClientUrlParams } from '../../../hooks/client-url-params.hook'

const CheckboxFilterItem = (props: ClientFilterSelectItem & { field: string }) => {
    const query = useClientUrlParams()
    const { filters, updateFilter } = useFilter(query)
    const subColor = useSubtitleColor()
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let filterValue = filters[props.field] || []
        const val: boolean = e.target.checked
        if (val) {
            if (filterValue.indexOf(props.value) == -1) filterValue.push(props.value)
        } else {
            filterValue = filterValue.filter((item) => item != props.value)
        }
        updateFilter(props.field, filterValue)
    }
    const isChecked = (filters[props.field] || []).indexOf(props.value) > -1
    return (
        <Checkbox isChecked={isChecked} onChange={onChange}>
            <HStack align="end">
                <Text as="span">{props.label}</Text>
                {props.count != undefined ? (
                    <Text as="span" fontSize={'sm'} color={subColor}>
                        ({props.count})
                    </Text>
                ) : null}
            </HStack>
        </Checkbox>
    )
}
const RadioFilterItem = (props: ClientFilterSelectItem) => {
    const subColor = useSubtitleColor()
    return (
        <Radio value={props.value}>
            <HStack align={'end'}>
                <Text as="span">{props.label}</Text>
                {props.count != undefined ? (
                    <Text as="span" fontSize={'sm'} color={subColor}>
                        ({props.count})
                    </Text>
                ) : null}
            </HStack>
        </Radio>
    )
}

export interface ClientFilterSelectItem {
    value: string
    label: ReactNode
    count?: number
}
export interface FilterGroupProps {
    field: string
    title: string
    allowMultiple?: boolean
    data: ClientFilterSelectItem[]
}

const CheckboxFilterList = (props: FilterGroupProps) => {
    const filterItemsHtml = props.data.map((item, i) => {
        return (
            <CheckboxFilterItem
                key={item.value}
                field={props.field}
                count={item.count}
                value={item.value}
                label={item.label}
            />
        )
    })

    return <Stack>{filterItemsHtml}</Stack>
}
const RadioFilterList = (props: FilterGroupProps) => {
    const query = useClientUrlParams()
    const { filters, updateFilter } = useFilter(query)
    const [filterVal = ''] = filters[props.field] || []
    const filterItemsHtml = props.data.map((item, i) => {
        return (
            <RadioFilterItem
                key={item.value}
                count={item.count}
                value={item.value}
                label={item.label}
            />
        )
    })
    return (
        <RadioGroup
            onChange={(val: string) => {
                updateFilter(props.field, [val])
            }}
            value={filterVal}
        >
            <Stack>{filterItemsHtml}</Stack>
        </RadioGroup>
    )
}

function FilterGroup({ allowMultiple = true, ...props }: FilterGroupProps) {
    return (
        <AccordionItem>
            <AccordionButton className="no-focus-shadow" _hover={{}}>
                <HStack justify={'space-between'} w="full">
                    <Heading fontSize={'lg'}>{props.title}</Heading>
                    <AccordionIcon />
                </HStack>
            </AccordionButton>
            <AccordionPanel pb={4}>
                {allowMultiple ? <CheckboxFilterList {...props} /> : <RadioFilterList {...props} />}
            </AccordionPanel>
        </AccordionItem>
    )
}

export default React.memo(FilterGroup)
