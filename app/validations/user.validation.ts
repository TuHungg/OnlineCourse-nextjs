import * as yup from 'yup'
import { apiCheckUnique } from '../apis/acp/admin.api'
import FieldLabel from '../utils/constants/field-label.constant'
import FormMsg from '../utils/constants/form-message.constant'
import { IUser } from './../modules/shared/interfaces/models/user.interface'
import { CONTROLLER } from './../utils/constants/app.constant'

export const UserValidation = {
    firstName: yup.string().required(FormMsg.required),
    lastName: yup.string().required(FormMsg.required),
    status: yup.string().required(FormMsg.required),
    email: (currentEmail?: string) =>
        yup
            .string()
            .email()
            .required(FormMsg.required)
            .test('checkDupEmail', FormMsg.unique, async function (value) {
                const validEmail = yup.string().email().validateSync(value)
                if (!validEmail || value == currentEmail) return true
                const result = await apiCheckUnique(CONTROLLER.user, 'email', value!)
                return !result
            }),
    phone: yup.string().test('checkPhone', FormMsg.length({ length: 10 }), (value) => {
        return !value || !!value?.match(/^.{10}$/)
    }),
    password: yup.string().when('_id', (_id, _) => {
        if (!_id) {
            return yup.string().min(8, FormMsg.minLength).required()
        }
        return yup
            .string()
            .nullable()
            .transform((c, o) => (c === '' ? null : c))
            .min(8, FormMsg.minLength)
    }),

    passwordConfirmation: yup.string().when('password', (password, _) => {
        if (password && password.length > 0) {
            return yup
                .string()
                .equals([password], FormMsg.same(FieldLabel['user.password']))
                .required(FormMsg.required)
        }
        return yup.string().nullable()
    }),
    role: yup.string().required(FormMsg.required),
    address: yup.string().nullable(),
}

export const userVldSchema = (initialValue?: Partial<IUser>) => {
    return yup
        .object({
            _id: yup.string().nullable(),
            firstName: UserValidation.firstName,
            lastName: UserValidation.lastName,
            status: UserValidation.status,
            email: UserValidation.email(initialValue?.email),
            phone: UserValidation.phone,
            address: UserValidation.address,
            password: UserValidation.password,
            passwordConfirm: UserValidation.passwordConfirmation,
            role: UserValidation.role,
        })
        .required()
}
