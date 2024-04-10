import axios from 'axios'
import { CartItemInterface } from 'interfaces/cart.interface'
import { loadAbort } from 'utils'

const stripeURL = process.env.REACT_APP_PAYMENTS_API + '/stripe'

export const createPayment = (products: CartItemInterface[]) => {
  const controller = loadAbort()

  return {
    call: () => axios.post(`${stripeURL}`, products, { signal: controller.signal }),
    controller,
  }
}

export const getPayment = (id: string) => {
  const controller = loadAbort()

  return {
    call: () =>
      axios.get(`${stripeURL}/${id}`, {
        signal: controller.signal,
      }),
    controller,
  }
}

export const confirmPayment = (paymentId: string | undefined, paymentData: any) => {
  const controller = loadAbort()

  return {
    call: () =>
      axios.post(
        `${stripeURL}/confirm/${paymentId}`,
        { paymentData },
        {
          signal: controller.signal,
        },
      ),
    controller,
  }
}
