import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const lengthCartList = cartList.length
      let totalValue = 0
      cartList.forEach(eachItem => {
        totalValue += eachItem.price * eachItem.count
      })

      return (
        <div className="checkout_container">
          <div className="checkout_section">
            <h1 className="checkout_total_heading">
              Order Total:
              <span className="total_cart_value"> Rs {totalValue}/-</span>
            </h1>
            <p className="checkout_total_item">
              {lengthCartList} items in cart
            </p>
            <button className="checkout_button" type="button">
              Check Out
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
