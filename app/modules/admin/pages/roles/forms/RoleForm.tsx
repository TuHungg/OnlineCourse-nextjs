import { Button, ButtonGroup, GridItem, HStack, SimpleGrid, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { default as React, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchById } from '../../../../../apis/acp/admin.api'
import { ROLE_STATUS_SELECT_DATA } from '../../../../../utils/data/role.data'
import { roleVldSchema } from '../../../../../validations/role.validation'
import MyCircularProgress from '../../../../shared/components/MyCircularProgress'
import MyInput from '../../../../shared/components/MyInput'
import MySelect from '../../../../shared/components/MySelect'
import MyTextArea from '../../../../shared/components/MyTextarea'
import { useCrudActions } from '../../../../shared/hooks/data/crud-actions.hook'
import IRole from '../../../../shared/interfaces/models/role.interface'
import { useAppDialog } from '../../../providers/app-dialog.provider'
import { usePageParams } from '../../../providers/page-params.provider'

type FormData = {
    _id?: string
    name: string
    ordering: number
    status: string
    description?: string
}

export interface RoleFormProps {
    id?: string
}
export default function RoleForm(props: RoleFormProps) {
    const { ctrlName } = usePageParams()

    const { onCreate, onUpdate } = useCrudActions()
    const { onClose } = useAppDialog()
    //
    const [loading, setLoading] = useState<boolean>(true)
    const [initialValues, setInitialValues] = useState<Partial<FormData>>({
        ordering: 0,
    })

    // FORM HOOKS
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: initialValues,
        resolver: yupResolver(roleVldSchema(initialValues)),
    })

    // FORM TYPE
    useEffect(() => {
        if (props.id) {
            fetchById<IRole>('roles', props.id).then((item) => {
                const values: FormData = {
                    _id: item._id,
                    name: item.name as any,
                    ordering: item.ordering,
                    status: item.status,
                    description: item.description,
                }
                setInitialValues(values)
                reset(values)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlName, props.id])

    // ON SUBMIT
    const onSubmit = handleSubmit(async (values) => {
        if (!props.id) {
            await onCreate(values)
            onClose()
        } else {
            const updatedItem = await onUpdate(props.id!, values)
            if (!!updatedItem) {
                setInitialValues(values)
                reset(values)
            }
        }
    })
    return (
        <form onSubmit={onSubmit}>
            {loading ? (
                <HStack justify={'center'}>
                    <MyCircularProgress />
                </HStack>
            ) : (
                <Stack>
                    <SimpleGrid columns={1} spacing={2}>
                        <GridItem colSpan={1}>
                            <MyInput
                                required
                                field="name"
                                label={'Name'}
                                register={register}
                                error={errors.name}
                                autoFocus
                            />
                        </GridItem>

                        <MyInput
                            min={0}
                            max={10}
                            required
                            field="ordering"
                            label={'Ordering'}
                            register={register}
                            error={errors.ordering}
                            type="number"
                        />
                        <GridItem colSpan={1}>
                            <MySelect
                                required
                                placeholder={'Select status'}
                                field="status"
                                label={'Status'}
                                register={register}
                                error={errors.status}
                                options={ROLE_STATUS_SELECT_DATA}
                            />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <MyTextArea
                                field="description"
                                label={'Description'}
                                register={register}
                                error={errors.description}
                            />
                        </GridItem>
                    </SimpleGrid>
                    <ButtonGroup justifyContent={'end'}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            colorScheme={'blue'}
                            type="submit"
                            disabled={!isDirty || isSubmitting}
                        >
                            Submit
                        </Button>
                    </ButtonGroup>
                </Stack>
            )}
        </form>
    )
}
