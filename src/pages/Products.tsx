import { Drawer } from '@mui/material'

import ProductTittle from '../components/Products/ProductTittle'
import ProductList from '../components/Products/ProductList'
import ProductsLayout from 'components/Products/ProductsLayout'
import { Wrapper } from 'components/Products/styles/Products.styles'
import Cart from 'components/Cart/Cart'
import { useCart } from 'context/cartContext'

export const Products = () => {
  const { cartItems } = useCart()

  const { open, setCartOpen } = useCart()

  return (
    <Wrapper>
      <Drawer anchor='right' open={open} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} />
      </Drawer>

      <ProductsLayout>
        <ProductTittle />
        <ProductList />
      </ProductsLayout>
    </Wrapper>
  )
}
