import { TController, TModel } from './../../../utils/data/data.type'
export default interface IActionOptions {
    referenceType?: string
    deletionValidate?: boolean
    modelName?: TModel
    ctrlName?: TController
    onSuccess?: () => void
    onError?: (error: any) => void
}
