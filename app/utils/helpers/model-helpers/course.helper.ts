import { ICoursePromotions } from '../../../modules/shared/interfaces/models/course.interface'
import { ICart } from '../../../modules/shared/interfaces/models/user.interface'
import DateHelper from '../date.helper'
import { TCourseCurrency } from './../../../modules/shared/interfaces/models/course.interface'

export default class CourseHelper {
    static getPrices(
        originPrice: number,
        currency: TCourseCurrency,
        promotions?: ICoursePromotions
    ) {
        let sellPrice = this.getSellPrice(originPrice, promotions)
        const discountPercent = sellPrice ? (originPrice - sellPrice) / originPrice : 0
        return {
            sellPrice,
            originPrice,
            discountPercent,
        }
    }
    static formatPrice(value: number) {
        const price = new Intl.NumberFormat('vi-VN').format(value)
        return price
    }

    static getTotalSellPrice(cart: ICart) {
        let amount = cart.courses.reduce((prev, current) => {
            return prev + this.getSellPrice(current.basicInfo.price, current.promotions)
        }, 0)
        return amount
    }

    static getSellPrice(originPrice: number, promotions?: ICoursePromotions) {
        let sellPrice = originPrice
        if (promotions?.enabled) {
            if (DateHelper.isBetweenTwoDateString(promotions.startAt!, promotions.endAt!)) {
                sellPrice = promotions.discountPrice || sellPrice
            }
        }
        return sellPrice
    }

    static formatRatingValue(value: number) {
        return Number.parseFloat(value.toFixed(1))
    }
}
