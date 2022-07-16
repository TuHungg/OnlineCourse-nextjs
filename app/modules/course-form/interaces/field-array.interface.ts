import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFieldArraySwap } from "react-hook-form"

export default interface IFieldArray<T> {
    fieldName:string
    swap: UseFieldArraySwap
    remove: UseFieldArrayRemove
    append: UseFieldArrayAppend<T>
    fields: FieldArrayWithId<T>[]
}