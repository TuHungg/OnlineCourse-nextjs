import * as yup from 'yup'
import { apiCheckUnique } from '../apis/acp/admin.api'
import ISlider from '../modules/shared/interfaces/models/slider.interface'
import { CONTROLLER } from '../utils/constants/app.constant'
import FormMsg from '../utils/constants/form-message.constant'

export const SliderValidation = {
    name: (current?: string) =>
        yup
            .string()
            .required(FormMsg.required)
            .test('checkDupName', FormMsg.unique, async function (value) {
                const valid = yup.string().validateSync(value)
                if (!valid || value == current) return true
                const result = await apiCheckUnique(CONTROLLER.slider, 'name', value!)
                return !result
            }),
    status: yup.string().required(FormMsg.required),
    description: yup.string().nullable(),
}

export const sliderVldSchema = (initialValue?: Partial<ISlider>) => {
    return yup
        .object({
            _id: yup.string().nullable(),
            status: SliderValidation.status,
            name: SliderValidation.name(initialValue?.name),
            description: SliderValidation.description,
        })
        .required()
}
