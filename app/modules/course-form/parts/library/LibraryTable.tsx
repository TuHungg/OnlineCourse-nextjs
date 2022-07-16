import {
    Button,
    ButtonGroup,
    Icon,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useOutsideClick,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'
import { apiUpdateLectureVideoFromLibrary } from '../../../../apis/course/course-form.api'
import { addCourseLectureResourceId } from '../../../../store/course/form-course.slice'
import AppIcon from '../../../../utils/constants/app-icon.constant'
import FormMsg from '../../../../utils/constants/form-message.constant'
import Helper from '../../../../utils/helpers/helper.helper'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import StatusBadge from '../../../admin/components/StatusBadge'
import Time from '../../../admin/components/Time'
import { useNotificationDialog } from '../../../admin/providers/notification-dialog.provider'
import EmptyMessageTr from '../../../shared/components/EmptyMessageTr'
import MyInput from '../../../shared/components/MyInput'
import { useAppToast } from '../../../shared/hooks/app-toast.hook'
import { useCrudActions } from '../../../shared/hooks/data/crud-actions.hook'
import IFile from '../../../shared/interfaces/models/file.interface'
import { RQK_COURSE } from '../../hooks/course-query.hook'
import { useLectureParams } from '../../providers/lecture-params.provider'
import { useUnitParams } from '../../providers/unit-params.provider'

type TLibraryTable = 'normal' | 'processing'
export interface LibraryTableProps {
    rows?: IFile[]
    type?: TLibraryTable
}

const vldSchema = yup.object({
    name: yup.string().required(FormMsg.required),
})

const EditableFileName = ({ row, type }: { row: IFile; type: TLibraryTable }) => {
    const normalName = (
        <Text title={row.name} cursor="text" onClick={() => setEditMode(true)} as="strong">
            {row.name}
        </Text>
    )
    const queryClient = useQueryClient()
    const { onUpdate } = useCrudActions()
    const [editMode, setEditMode] = useState<boolean>(false)
    const ref = React.useRef<HTMLFormElement>(null)
    // initial form
    const [name, ext] = Helper.extractFileName(row.name)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ name: string }>({
        defaultValues: { name },
        resolver: yupResolver(vldSchema),
    })

    // out side
    useOutsideClick({
        ref,
        handler: () => {
            setEditMode(false)
        },
    })

    // submit
    const onSubmit = handleSubmit((values) => {
        const { name } = values
        const fileName = `${name}.${ext}`
        onUpdate<IFile>(row._id, { name: fileName }, { ctrlName: 'files', modelName: 'file' }).then(
            (_) => {
                queryClient.invalidateQueries(RQK_COURSE)
            }
        )
        setEditMode(false)
    })

    // methods
    // handle reset
    useEffect(() => {
        if (!editMode) reset(undefined, { keepValues: true })
    }, [editMode, reset])

    if (type == 'processing') return normalName

    return (
        <>
            {editMode ? (
                <form ref={ref} onSubmit={onSubmit}>
                    <MyInput
                        autoFocus
                        field="name"
                        label="Name"
                        register={register}
                        showLabelRow={false}
                        error={errors.name}
                        size="sm"
                    />
                </form>
            ) : (
                normalName
            )}
        </>
    )
}

const LibraryRow = ({ row, type }: { row: IFile; type: TLibraryTable }) => {
    const { onShow } = useNotificationDialog()
    const {
        state: { lecture, contentType },
    } = useLectureParams()
    const {
        methods: { setEditContent },
    } = useUnitParams()
    const toast = useAppToast()
    const queryClient = useQueryClient()
    const { onDeleteOne, onUpdate, onXThunkUpdate } = useCrudActions()

    const onSelectClick = async () => {
        switch (contentType) {
            case 'video':
                await apiUpdateLectureVideoFromLibrary(lecture?._id || '', row._id)
                toast(NotifyHelper.success('Lecture updated'))
                break
            case 'resource':
                const existingItem = (lecture.resources as IFile[]).find(
                    (item) => item._id == row._id
                )
                if (!existingItem) {
                    await onXThunkUpdate(
                        addCourseLectureResourceId({ lectureId: lecture._id, resourceId: row._id })
                    )
                } else {
                    onShow({
                        title: 'Resourced existed',
                        content: 'This resource already exist in your list!',
                    })
                }
                break
        }
        queryClient.invalidateQueries(RQK_COURSE)
        setEditContent(false)
    }

    const onDeleteClick = async () => {
        await onDeleteOne(row._id, row.name, { ctrlName: 'files', modelName: 'file' })
        queryClient.invalidateQueries(RQK_COURSE)
    }

    return (
        <Tr key={row._id}>
            <Td isTruncated>
                <EditableFileName row={row} type={type} />
            </Td>
            <Td>{row.type}</Td>
            <Td>
                <StatusBadge status={row.status} />
            </Td>
            <Td>
                <Time type="short" timestamp={row.history.createdAt} />
            </Td>
            {type == 'normal' ? (
                <Td>
                    <ButtonGroup spacing={1}>
                        <Button onClick={onSelectClick} colorScheme="purple" variant="link">
                            Select
                        </Button>
                        <IconButton
                            onClick={onDeleteClick}
                            colorScheme="purple"
                            aria-label=""
                            variant="link"
                            icon={<Icon as={AppIcon.delete} />}
                        />
                    </ButtonGroup>
                </Td>
            ) : null}
        </Tr>
    )
}

export default function LibraryTable({ rows, type = 'normal' }: LibraryTableProps) {
    const rowsHtml = rows?.map((item) => {
        return <LibraryRow key={item._id} row={item} type={type} />
    })
    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>File name</Th>
                        <Th>Type</Th>
                        <Th>Status</Th>
                        <Th>
                            <Button variant="unstyled" leftIcon={<Icon as={AppIcon.sortDown} />}>
                                Date
                            </Button>
                        </Th>
                        {type == 'normal' ? <Th>Actions</Th> : null}
                    </Tr>
                </Thead>
                <Tbody>{rows && rows.length > 0 ? rowsHtml : <EmptyMessageTr />}</Tbody>
                {type == 'processing' ? (
                    <Tfoot>
                        <Tr>
                            <Td colSpan={1000}>
                                <Text>
                                    <Text as="strong">Note:</Text> This video is still being
                                    processed.{' '}
                                </Text>
                            </Td>
                        </Tr>
                    </Tfoot>
                ) : null}
            </Table>
        </TableContainer>
    )
}
