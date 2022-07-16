import { Alert, AlertIcon, Button, Icon, List, ListItem } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import lan from '../../../../utils/constants/lan.constant';
import IAnswerFormData from '../../interaces/answer-form-data.inteface';
import { useAnswerFieldArray } from '../../providers/answer-field-array.provider';
import SortableAnswerCard from '../SortableAnswerCard/SortableAnswerCard';

// export interface SortableAnswerCardListProps extends IFieldArray<IAnswerFormData> {
export interface SortableAnswerCardListProps {
    placeholders: string[]
}

export default function SortableAnswerCardList({
    placeholders,
}: SortableAnswerCardListProps) {
    const { register, formState: { errors }, watch } = useFormContext<IAnswerFormData>();
    const { formName, fields, append, remove, swap, maxLength, minQty, fieldName } = useAnswerFieldArray();
    //
    const canDelete = fields.length > (minQty || 0)
    const renderCard = useCallback((field, i) => {
        const placeholder = placeholders[i % placeholders.length];
        const inputField = `${fieldName}.${i}.content`;
        const value = watch(inputField as any) || '';
        return (
            <ListItem key={field.id}>
                <SortableAnswerCard
                    formName={formName}
                    swap={swap}
                    remove={remove}
                    register={register}
                    field={inputField}
                    placeholder={placeholder}
                    index={i}
                    canDelete={canDelete}
                    maxLength={maxLength}
                    value={value}
                />
            </ListItem>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canDelete])
    const onAddClick = useCallback(() => {
        append({ content: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const canAdd = watch().answers?.filter((item) => !item.content).length == 0;
    return (
        <>
            {
                fields.length > 0 ? (
                    <List spacing={4} mb={8}>
                        {fields.map(renderCard)}
                    </List>
                ) : null
            }
            {
                errors.answers
                    ? (
                        <Alert status='error' my={4}>
                            <AlertIcon />
                            {(errors.answers as any).message}
                        </Alert>
                    ) : null
            }
            <Button disabled={!canAdd} onClick={onAddClick} colorScheme={'purple'} leftIcon={<Icon as={FiPlus} />} variant='link' >
                {lan.ADD_MORE_TO_YOUR_RESPONSE}
            </Button>
        </>
    )
}
