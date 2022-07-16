import { ICart } from './../../modules/shared/interfaces/models/user.interface'
const CART = 'cart'
export default class LocalStorageHelper {
    static clearCart() {
        localStorage.removeItem(CART)
    }
    static setCart(item: ICart) {
        localStorage.setItem(CART, JSON.stringify(item))
    }
    static getCart() {
        const item = localStorage.getItem(CART)
        if (item) return JSON.parse(item) as ICart
    }
}
