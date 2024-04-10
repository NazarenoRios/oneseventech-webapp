import { useFetchAndLoad } from 'hooks'
import CartItem from './CartItem'
import { Wrapper } from './styles/Cart.Styles'
import { useCart } from 'context/cartContext'
import { createPayment } from 'services/stripe.service'
import { useNavigate } from 'react-router'

const Cart = ({ cartItems }: any) => {
  const { totalItems, totalPrice, setCartItems } = useCart()

  const { callEndpoint } = useFetchAndLoad()

  const navigate = useNavigate()

  const handleCheckout = async () => {
    const response = await callEndpoint(createPayment(cartItems))

    if (response.status === 201) {
      localStorage.setItem('cart', '[]')
      const paymentId = response.data.id
      navigate(`/checkout/${paymentId}`)
      setCartItems([])
    }
  }

  return (
    <Wrapper>
      <h2 className='flex text-center justify-center items-center text-2xl mb-12'>Your Cart</h2>
      {totalItems === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item: any, index: number) => (
        <CartItem key={index} item={item} /> // Usando el índice como la clave
      ))}
      <h2>
        Total: <span className='font-bold'>${totalPrice.toFixed(2)}</span>
      </h2>

      {totalItems > 0 && (
        <div className='flex items-center justify-center'>
          <button
            onClick={() => handleCheckout()}
            className='uppercase bg-[#7661fe] hover:bg-[#5647b6] text-white font-bold py-2 px-4 rounded mt-3'
          >
            proceed to checkout
          </button>
        </div>
      )}
    </Wrapper>
  )
}

export default Cart
