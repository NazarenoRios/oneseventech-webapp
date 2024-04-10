export const getTotalCartItems = () => {
  let cart = JSON.parse(localStorage.getItem('cart') ?? '[]')
  return cart.reduce((acc: number, item: any) => acc + item.quantity, 0)
}
