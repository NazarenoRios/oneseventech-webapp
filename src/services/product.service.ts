import axios from 'axios'
import { CartItemInterface } from 'interfaces/cart.interface'
import { Product } from 'interfaces/product.interface'
import { loadAbort } from 'utils'
import displayToast from 'utils/toast.utility'

const productsURL = process.env.REACT_APP_PRODUCTS_API

export const getProducts = () => {
  const controller = loadAbort()

  return {
    call: () =>
      axios.get(`${productsURL}/products`, {
        signal: controller.signal,
      }),
    controller,
  }
}

export const addProductToCart = (product: Product) => {
  const cart: CartItemInterface[] = JSON.parse(localStorage.getItem('cart') ?? '[]')
  const productIndex = cart.findIndex((item) => item.product.id === product.id)
  if (productIndex !== -1) {
    cart[productIndex].quantity++
  } else {
    cart.push({ product, quantity: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  displayToast('Producto agregar al carrito', 'success')
}
