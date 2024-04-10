import { CartItemInterface } from 'interfaces/cart.interface'
import { Wrapper } from './styles/CartItem.Styles'
import { Button } from '@mui/material'
import { useCart } from 'context/cartContext'
import { addProductToCart } from 'services/product.service'

interface Props {
  item: CartItemInterface
}

const CartItem = ({ item }: Props) => {
  const { addToCart, modifyCartItem } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    addProductToCart(product)
  }

  const handleDecrement = () => {
    modifyCartItem(item, item.quantity - 1)
  }

  return (
    <Wrapper>
      <div>
        <h3>{item.product.title}</h3>
        <div className='information'>
          <p>
            Price: <span className='font-bold'>${item.product.price}</span>
          </p>
          <p>
            Total:{' '}
            <span className='font-bold'>${(item.product.price * item.quantity).toFixed(2)}</span>
          </p>
        </div>
        <div className='buttons'>
          <Button
            variant='contained'
            size='small'
            disableElevation
            style={{
              backgroundColor: '#7661fe',
              fontWeight: 'bold',
              minWidth: 30,
            }} /* Ajustamos el ancho mínimo */
            onClick={handleDecrement}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            variant='contained'
            size='small'
            disableElevation
            style={{ backgroundColor: '#7661fe', minWidth: 30 }} /* Ajustamos el ancho mínimo */
            onClick={() => handleAddToCart(item.product)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.product.image} alt={item.product.title} />
    </Wrapper>
  )
}

export default CartItem
