import { UseToastOptions } from '@chakra-ui/react'
import lan from '../constants/lan.constant'

export default class NotifyHelper {
    static info(title: string): UseToastOptions {
        return {
            title,
            status: 'info',
        }
    }
    static success(title: string): UseToastOptions {
        return {
            title,
            status: 'success',
        }
    }
    static error(title: string): UseToastOptions {
        return {
            title,
            status: 'error',
        }
    }
    static warning(title: string, description?: string): UseToastOptions {
        return {
            title,
            description,
            status: 'warning',
        }
    }
    static get somethingWentWrong(): UseToastOptions {
        return {
            title: lan.SOMETHING_WENT_WRONG,
            status: 'warning',
        }
    }
}
