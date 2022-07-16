import * as yup from "yup";
import FormMsg from "../utils/constants/form-message.constant";

export const answerFieldArraySchema = (requiredLength: number) => yup.object({
    answers: yup
        .array()
        .test({
            message: FormMsg.minQty({ qty: requiredLength }),
            test: (values) => {
                const validItems = values?.filter(item => item?.content?.trim() != '');
                if (validItems && validItems.length >= requiredLength) return true
                return false;
            }
        })
})