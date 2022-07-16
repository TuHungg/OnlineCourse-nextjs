import { AsyncThunkAction } from '@reduxjs/toolkit'
import lodash from 'lodash'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import {
    apiCreate,
    apiDeactivate,
    apiDeleteMany,
    apiDeleteOne,
    apiReactivate,
    apiUpdate,
    apiValidateDeletion,
} from '../../../../apis/acp/admin.api'
import { useAppDispatch } from '../../../../store/hooks'
import lan from '../../../../utils/constants/lan.constant'
import Helper from '../../../../utils/helpers/helper.helper'
import NotifyHelper from '../../../../utils/helpers/notify.helper'
import PathHelper from '../../../../utils/helpers/path.helper'
import { usePageParams } from '../../../admin/providers/page-params.provider'
import { useSimpleDialog } from '../../../admin/providers/simple-dialog.provider'
import IActionOptions from '../../interfaces/action-options.interface'
import IConflictData from '../../interfaces/conflict-data.interface'
import { useAppToast } from '../app-toast.hook'
export const useCrudActions = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const toast = useAppToast()
    const queryClient = useQueryClient()
    const simpleDialog = useSimpleDialog()
    const { ctrlName, modelName } = usePageParams()

    const onDeactivate = useCallback(
        async (id: string, itemName?: string, options?: IActionOptions): Promise<void> => {
            const { ctrlName: ctrl = ctrlName, modelName: model = modelName } = options || {}
            return new Promise<void>((resolve, reject) => {
                simpleDialog.onShow({
                    title: `${lodash.capitalize(lan.DEACTIVATE)} ${itemName}`,
                    content: Helper.strFormat(lan.DEACTIVATE_WARNING, model),
                    onPositive: async () => {
                        try {
                            await apiDeactivate(ctrl, id)
                            queryClient.invalidateQueries([ctrl])
                            const title = itemName
                                ? `${itemName} ${lan.DEACTIVATED}`
                                : Helper.lodash.upperFirst(lan.ITEM_DEACTIVATED)
                            toast(NotifyHelper.success(title))
                            //
                            options?.onSuccess && options.onSuccess()
                            resolve()
                        } catch (e: any) {
                            toast(NotifyHelper.somethingWentWrong)
                            options?.onError && options.onError(e)
                            reject(e)
                        }
                    },
                })
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ctrlName, router]
    )
    const onReactivate = useCallback(
        async (id: string, itemName?: string, options?: IActionOptions): Promise<void> => {
            const { ctrlName: ctrl = ctrlName } = options || {}
            try {
                await apiReactivate(ctrl, id)
                queryClient.invalidateQueries([ctrl])
                const title = itemName
                    ? `${itemName} ${lan.REACTIVATED}`
                    : Helper.lodash.upperFirst(lan.ITEM_REACTIVATED)
                toast(NotifyHelper.success(title))
                //
                options?.onSuccess && options.onSuccess()
            } catch (e: any) {
                toast(NotifyHelper.somethingWentWrong)
                options?.onError && options.onError(e)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ctrlName, router]
    )

    const onDeleteOne = useCallback(
        async (id: string, itemName?: string, options?: IActionOptions): Promise<void> => {
            let canDelete = true
            let content = lan.DELETE_WARNING
            let conflictData: IConflictData
            const {
                referenceType = modelName,
                ctrlName: ctrl = ctrlName,
                modelName: model = modelName,
                deletionValidate = false,
            } = options || {}
            const onShowDeleteDialog = () => {
                return new Promise<void>((resolve, reject) => {
                    simpleDialog.onShow({
                        title: canDelete
                            ? `${lodash.capitalize(lan.DELETE)} ${itemName}`
                            : lodash.capitalize(lan.CANNOT_DELETE),
                        content,
                        colorScheme: !canDelete ? 'teal' : undefined,
                        positiveTitle: !canDelete
                            ? conflictData?.reference?.type != 'usercourses'
                                ? `View ${conflictData?.reference?.type}`
                                : 'Got it'
                            : undefined,
                        onPositive: async () => {
                            if (canDelete) {
                                try {
                                    await apiDeleteOne(ctrl, id)
                                    queryClient.invalidateQueries([ctrl])
                                    const title = itemName
                                        ? `${itemName} ${lan.DELETED}`
                                        : Helper.lodash.upperFirst(lan.ITEM_DELETED)
                                    toast(NotifyHelper.success(title))
                                    //
                                    options?.onSuccess && options.onSuccess()
                                    resolve()
                                } catch (e: any) {
                                    toast(NotifyHelper.somethingWentWrong)
                                    options?.onError && options.onError(e)
                                    reject(e)
                                }
                            } else if (conflictData.reference.type != 'usercourses') {
                                router.push(
                                    PathHelper.getAdminControllerPage(
                                        conflictData?.reference.type,
                                        {
                                            [`${referenceType}._id_filter`]: id,
                                        }
                                    )
                                )
                            }
                        },
                    })
                })
            }
            if (deletionValidate) {
                try {
                    await apiValidateDeletion(ctrl, id)
                } catch (e: any) {
                    const data: any = e.response.data
                    conflictData = data
                    canDelete = false
                    if (conflictData.reference.type == 'usercourses') {
                        content = `There are ${data?.reference?.amount} student have enrolled this ${model}. Because of students lifetime access, so courses cannot be deleted after students have enrolled.`
                    } else {
                        content = `There are ${data?.reference?.amount} ${data?.reference?.type} referencing this ${model}.`
                    }
                    return onShowDeleteDialog()
                }
            }
            return onShowDeleteDialog()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ctrlName, router]
    )

    const onCreate = useCallback(
        async <T>(data: Partial<T>, options?: IActionOptions): Promise<T | null> => {
            const ctrl = options?.ctrlName || ctrlName
            const model = options?.modelName || modelName
            try {
                const item = await apiCreate<T>(ctrl, data)
                queryClient.invalidateQueries([ctrl])
                toast(
                    NotifyHelper.success(
                        `${Helper.lodash.upperFirst(model)} ${Helper.lodash.upperFirst(
                            lan.CREATED
                        )}`
                    )
                )
                return item
            } catch (e) {
                toast(NotifyHelper.somethingWentWrong)
            }
            return null
        },
        [ctrlName, modelName, toast, queryClient]
    )

    const onUpdate = useCallback(
        async <T>(id: string, data: Partial<T>, options?: IActionOptions): Promise<T | null> => {
            const ctrl = options?.ctrlName || ctrlName
            const model = options?.modelName || modelName
            try {
                const item = await apiUpdate<T>(ctrl, id, data)
                queryClient.invalidateQueries([ctrl])
                toast(
                    NotifyHelper.success(
                        `${Helper.lodash.upperFirst(model)} ${Helper.lodash.upperFirst(
                            lan.UPDATED
                        )}`
                    )
                )
                return item
            } catch (e) {
                toast(NotifyHelper.somethingWentWrong)
            }
            return null
        },
        [ctrlName, modelName, toast, queryClient]
    )

    const onXThunkUpdate = useCallback(
        async <T>(
            asyncThunk: AsyncThunkAction<T, any, {}>,
            options?: IActionOptions
        ): Promise<T | null> => {
            try {
                await dispatch(asyncThunk)
                queryClient.invalidateQueries([ctrlName])
                toast(
                    NotifyHelper.success(
                        `${Helper.lodash.upperFirst(modelName)} ${Helper.lodash.upperFirst(
                            lan.UPDATED
                        )}`
                    )
                )
            } catch (e) {
                toast(NotifyHelper.somethingWentWrong)
            }
            return null
        },
        [dispatch, queryClient, ctrlName, toast, modelName]
    )

    const onDeleteMany = useCallback(
        (ids: string[], options?: IActionOptions) => {
            simpleDialog.onShow({
                title: `${Helper.lodash.capitalize(lan.DELETE)} ${ids.length} ${
                    lan.SELECTED_ITEMS
                }`,
                content: lan.DELETE_WARNING,
                onPositive: async () => {
                    try {
                        await apiDeleteMany(ctrlName, ids)
                        queryClient.invalidateQueries([ctrlName])
                        const title = `${ids.length} ${lan.ITEMS_DELETED}`
                        toast(NotifyHelper.success(title))
                        //
                        options?.onSuccess && options.onSuccess()
                    } catch (e: any) {
                        toast(NotifyHelper.somethingWentWrong)
                        //
                        options?.onError && options.onError(e)
                    }
                },
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ctrlName]
    )

    return {
        onDeleteOne,
        onDeleteMany,
        onCreate,
        onUpdate,
        onXThunkUpdate,
        onDeactivate,
        onReactivate,
    }
}
