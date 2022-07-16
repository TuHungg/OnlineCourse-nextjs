import {
    Box,
    ButtonGroup,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { UseFormRegister } from 'react-hook-form'
import { FiTrash } from 'react-icons/fi'
import DragButton from '../../../shared/components/DragButton'
import { useSortable } from '../../../shared/hooks/sortable.hook'
import { useSubtitleColor } from '../../../shared/hooks/style.hook'
import { TDragItem } from '../../../shared/interfaces/drag-item.interface'
import IAnswerFormData from '../../interaces/answer-form-data.inteface'
import IFieldArray from '../../interaces/field-array.interface'

export interface SortableAnswerCardProps extends Partial<IFieldArray<IAnswerFormData>> {
    formName: string
    placeholder?: string
    maxLength?: number
    //
    field: string
    index: number
    value: string
    //
    canDelete: boolean
    register: UseFormRegister<IAnswerFormData>
}

function SortableAnswerCard({
    register,
    swap,
    remove,
    formName,
    field,
    index,
    canDelete,
    placeholder,
    maxLength,
    value,
}: SortableAnswerCardProps) {
    const {
        ref,
        state: { isDragging, canDrop },
        dragButtonEvents,
    } = useSortable({
        accept: `${formName}-answer-card`,
        canDrag: false,
        item: { id: index + '' },
        onSwap: (item) => {
            swap && swap(Number.parseInt(item.id), index)
            item.id = index + ''
        },
    })

    //
    const subColor = useSubtitleColor()
    const onDeleteClick = useCallback(() => {
        if (canDelete) {
            remove && remove(index)
        }
    }, [canDelete, index, remove])

    const opacity = isDragging ? 0 : 1
    return (
        <Box
            ref={ref}
            maxW={{
                base: '100%',
                lg: '80%',
            }}
        >
            <HStack
                opacity={opacity}
                // visibility={isOver ? 'hidden' : 'visible'}
                sx={{
                    '&:hover': {
                        '> .actions': {
                            visibility: !canDrop && value.length > 0 ? 'visible' : 'hidden',
                        },
                    },
                }}
            >
                <HStack flex={1}>
                    <InputGroup>
                        <Input
                            isTruncated
                            {...(register ? register(field as any) : {})}
                            autoComplete="off"
                            maxLength={maxLength}
                            flex={1}
                            placeholder={placeholder}
                        />
                        {maxLength && (
                            <InputRightElement>
                                <Text color={subColor}>{maxLength - value.length}</Text>
                            </InputRightElement>
                        )}
                    </InputGroup>
                </HStack>
                <ButtonGroup className="actions" visibility={'hidden'}>
                    <IconButton
                        disabled={!canDelete}
                        onClick={onDeleteClick}
                        aria-label=""
                        icon={<Icon as={FiTrash} />}
                        tabIndex={-1}
                    />
                    <DragButton {...dragButtonEvents} tabIndex={-1} />
                </ButtonGroup>
            </HStack>
        </Box>
    )
}
export default React.memo(SortableAnswerCard)
