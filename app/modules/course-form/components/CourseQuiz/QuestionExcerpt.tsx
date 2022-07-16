import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { deleteQuizQuestion } from '../../../../store/course/form-course.slice'
import lan from '../../../../utils/constants/lan.constant'
import Helper from '../../../../utils/helpers/helper.helper'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import { useSimpleDialog } from '../../../admin/providers/simple-dialog.provider'
import DeleteButton from '../../../shared/components/DeleteButton'
import EditButton from '../../../shared/components/EditButton'
import { useAppToast } from '../../../shared/hooks/app-toast.hook'
import { useCrudActions } from '../../../shared/hooks/data/crud-actions.hook'
import { IQuestion } from '../../../shared/interfaces/models/quiz.interface'
import { useQuizParams } from '../../providers/quiz-params.provider'
import { useUnitParams } from '../../providers/unit-params.provider'

export interface QuestionExcerptProps {
    question: IQuestion
    index: number
}

export default function QuestionExcerpt(props: QuestionExcerptProps) {
    const toast = useAppToast()
    const simpleDialog = useSimpleDialog()
    const { address } = useUnitParams()
    const {
        state: { quiz },
        methods: { setEditingQuestion },
    } = useQuizParams()
    const { onXThunkUpdate } = useCrudActions()
    const no = props.index + 1 + ''
    const onEdit = () => {
        setEditingQuestion(props.question)
    }
    const onDelete = () => {
        simpleDialog.onShow({
            title: `${Helper.lodash.capitalize(lan.DELETE)} ${Helper.cvtHtmlToText(
                props.question.questionContent
            )}`,
            content: lan.DELETE_WARNING,
            onPositive: async () => {
                try {
                    onXThunkUpdate(
                        deleteQuizQuestion({
                            unitAddress: address,
                            id: quiz._id,
                            questionId: props.question._id,
                        })
                    )
                } catch (e: any) {
                    toast(NotifyHelper.somethingWentWrong)
                }
            },
        })
    }
    return (
        <HStack
            sx={{
                '&:hover': {
                    '>.actions': {
                        visibility: 'visible',
                    },
                },
            }}
        >
            <Text as={'strong'}>{no}.</Text>
            <Text dangerouslySetInnerHTML={{ __html: props.question.questionContent }}></Text>
            <HStack
                display={{ base: 'none', md: 'flex' }}
                visibility={'hidden'}
                className="actions"
                flex={1}
                justify="end"
            >
                <HStack>
                    <EditButton onClick={onEdit} size="xs" />
                    <DeleteButton onClick={onDelete} size="xs" />
                </HStack>
                {/* <DragButton aria-label='' /> */}
            </HStack>
        </HStack>
    )
}
