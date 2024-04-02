import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartList from '../CartList'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItem} = value
      const lengthCartList = cartList.length

      const onClickRemoveAll = () => {
        removeAllCartItem()
      }

      return (
        <>
          <Header />
          {lengthCartList === 0 ? (
            <div className="empty-cart-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
                alt="cart"
                className="cart-img"
              />
              <h1 className="empty_cart">Empty</h1>
            </div>
          ) : (
            <div className="cart_container">
              <h1 className="my_cart_heading">My Cart</h1>
              <div className="empty_cart_list_container">
                <button
                  className="empty_cart_list"
                  onClick={onClickRemoveAll}
                  type="button"
                >
                  Remove All
                </button>
              </div>
              <CartList />
              <CartSummary />
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
