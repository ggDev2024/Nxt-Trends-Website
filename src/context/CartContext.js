import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItemList: () => {},
  deleteCartItemList: () => {},
  removeAllCartItem: () => {},
  incrementCartProductCount: () => {},
  decrementCartProductCount: () => {},
})

export default CartContext
