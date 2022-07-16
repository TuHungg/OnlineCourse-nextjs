import { HStack, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { useQueryClient } from 'react-query'
import { removeCourseLectureResource } from '../../../../../store/course/form-course.slice'
import AppIcon from '../../../../../utils/constants/app-icon.constant'
import lan from '../../../../../utils/constants/lan.constant'
import Helper from '../../../../../utils/helpers/helper.helper'
import NotifyHelper from '../../../../../utils/helpers/notify.helper'
import { useSimpleDialog } from '../../../../admin/providers/simple-dialog.provider'
import DeleteButton from '../../../../shared/components/DeleteButton'
import { useAppToast } from '../../../../shared/hooks/app-toast.hook'
import { useCrudActions } from '../../../../shared/hooks/data/crud-actions.hook'
import IFile from '../../../../shared/interfaces/models/file.interface'
import { RQK_COURSE } from '../../../hooks/course-query.hook'
import { useLectureParams } from '../../../providers/lecture-params.provider'

export interface ResourceExcerptProps {
    file: IFile
    index: number
}

export default function ResourceExcerpt(props: ResourceExcerptProps) {
    const toast = useAppToast()
    const queryClient = useQueryClient()
    const simpleDialog = useSimpleDialog()
    const {
        state: { lecture },
    } = useLectureParams()
    const { onXThunkUpdate } = useCrudActions()
    const onDelete = () => {
        simpleDialog.onShow({
            title: `${Helper.lodash.capitalize(lan.DELETE)} ${Helper.cvtHtmlToText(
                props.file.name
            )}`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                try {
                    await onXThunkUpdate(
                        removeCourseLectureResource({
                            lectureId: lecture._id,
                            resourceId: props.file._id,
                        })
                    )
                    queryClient.invalidateQueries(RQK_COURSE)
                } catch (e: any) {
                    toast(NotifyHelper.somethingWentWrong)
                }
            },
        })
    }
    return (
        <HStack justify={'space-between'}>
            <HStack>
                <Icon as={AppIcon.download} />
                <Text>{props.file.name}</Text>
            </HStack>
            <DeleteButton onClick={onDelete} size="xs" />
        </HStack>
    )
}
