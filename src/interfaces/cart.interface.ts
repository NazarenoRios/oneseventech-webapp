import { Product } from './product.interface'

export interface CartItemInterface {
  product: Product
  quantity: number
}

export class CartItemInterface {
  constructor(cartData: CartItemInterface) {
    this.product = cartData.product
    this.quantity = cartData.quantity
  }
}
