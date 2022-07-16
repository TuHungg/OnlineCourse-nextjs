import * as yup from 'yup'
import { apiCheckUnique } from '../apis/acp/admin.api'
import { ICategory } from '../modules/shared/interfaces/models/category.interface'
import { IUser } from '../modules/shared/interfaces/models/user.interface'
import { CONTROLLER } from '../utils/constants/app.constant'
import FormMsg from '../utils/constants/form-message.constant'

export const categoryVldSchema = (initialValue?: Partial<ICategory>) => {
    return yup.object({
        _id: yup.string().nullable(),
        name: yup.string().required(FormMsg.required),
        slug: yup
            .string()
            .required(FormMsg.required)
            .test('checkDupSlug', FormMsg.unique, async function (value) {
                const validValue = yup.string().validateSync(value)
                if (!validValue || value == initialValue?.slug) return true
                const result = await apiCheckUnique(CONTROLLER.category, 'slug', value!)
                return !result
            }),
        status: yup.string().required(FormMsg.required),
        parent: yup.string().nullable(),
    })
}
