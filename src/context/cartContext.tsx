import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItemInterface } from 'interfaces/cart.interface'
import { Product } from 'interfaces/product.interface'

interface CartContextType {
  cartItems: CartItemInterface[]
  totalItems: number
  totalPrice: number
  addToCart: (product: Product) => void
  open: boolean
  setCartOpen: (open: boolean) => void
  modifyCartItem: (item: CartItemInterface, newQuantity: number) => void
  setCartItems: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
}

interface CartProviderProps {
  children: React.ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemInterface[]>(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  const [open, setCartOpen] = useState(false)

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product) => {
    const updatedCartItems = [...cartItems]
    const productIndex = updatedCartItems.findIndex((item) => item.product.id === product.id)

    if (productIndex !== -1) {
      updatedCartItems[productIndex].quantity++
    } else {
      updatedCartItems.push({ product, quantity: 1 })
    }

    setCartItems(updatedCartItems)
  }

  const modifyCartItem = (item: CartItemInterface, newQuantity: number) => {
    if (newQuantity > 0) {
      item.quantity = newQuantity
      setCartItems([...cartItems])
    } else {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.product.id !== item.product.id,
      )
      setCartItems(updatedCartItems)
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        open,
        setCartOpen,
        modifyCartItem,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
