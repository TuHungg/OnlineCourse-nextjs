import * as yup from 'yup'
import { apiCheckUnique } from '../apis/acp/admin.api'
import FieldLabel from '../utils/constants/field-label.constant'
import FormMsg from '../utils/constants/form-message.constant'
import { IUser } from '../modules/shared/interfaces/models/user.interface'
import { CONTROLLER } from '../utils/constants/app.constant'
import IRole from '../modules/shared/interfaces/models/role.interface'

export const roleVldSchema = (initialValue?: Partial<IRole>) => {
    return yup
        .object({
            _id: yup.string().nullable(),
            name: yup
                .string()
                .required(FormMsg.required)
                .test('checkDupName', FormMsg.unique, async function (value) {
                    const valid = yup.string().validateSync(value)
                    if (!valid || value == initialValue?.name) return true
                    const result = await apiCheckUnique(CONTROLLER.role, 'name', value!)
                    return !result
                }),
            ordering: yup.number().required(FormMsg.required),
            status: yup.string().required(FormMsg.required),
            description: yup.string().nullable(),
        })
        .required()
}
