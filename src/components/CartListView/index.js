import {Component} from 'react'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import {ImCross} from 'react-icons/im'

import CartContext from '../../context/CartContext'

import './index.css'

class CartListView extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            deleteCartItemList,
            incrementCartProductCount,
            decrementCartProductCount,
          } = value

          const {cartProduct} = this.props
          const {id, imageUrl, title, price, brand, count} = cartProduct

          const onClickDeleteCartItem = () => {
            deleteCartItemList(id)
          }

          const onIncrementCartCount = () => {
            incrementCartProductCount(id)
          }

          const onDecrementCartCount = () => {
            decrementCartProductCount(id)
          }

          return (
            <li className="cart_list_container">
              <div className="cart_mobile_container">
                <img
                  className="cart_product_image"
                  src={imageUrl}
                  alt={title}
                />
                <div className="cart_mobile_details">
                  <h1 className="cart_product_heading">{title}</h1>
                  <p className="cart_product_description">{brand}</p>
                  <div className="cart_quantity_container">
                    <button
                      aria-label="minus_quantity"
                      type="button"
                      data-testid="minus"
                      onClick={onDecrementCartCount}
                      className="add_cart_product_button"
                    >
                      <BsDashSquare />
                    </button>
                    <p className="add_cart_product_num">{count}</p>
                    <button
                      aria-label="plus_quantity"
                      data-testid="plus"
                      onClick={onIncrementCartCount}
                      className="add_cart_product_button"
                      type="button"
                    >
                      <BsPlusSquare />
                    </button>
                  </div>
                  <div className="cart_mobile_container_PS">
                    <h1 className="cart_product_price">Rs {price}/-</h1>
                    <button
                      type="button"
                      onClick={onClickDeleteCartItem}
                      className="cart_mobile_remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart_view_container1">
                <img
                  className="cart_product_image"
                  src={imageUrl}
                  alt={title}
                />
                <div className="cart_product_details">
                  <h1 className="cart_product_heading">{title}</h1>
                  <p className="cart_product_description">{brand}</p>
                </div>
              </div>
              <div className="cart_view_container2">
                <div className="cart_quantity_container">
                  <button
                    aria-label="minus_quantity"
                    type="button"
                    data-testid="minus"
                    onClick={onDecrementCartCount}
                    className="add_cart_product_button"
                  >
                    <BsDashSquare />
                  </button>
                  <p className="add_cart_product_num">{count}</p>
                  <button
                    aria-label="plus_quantity"
                    data-testid="plus"
                    onClick={onIncrementCartCount}
                    className="add_cart_product_button"
                    type="button"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <h1 className="cart_product_price">{price}/-</h1>
                <button
                  aria-label="delete_cart_item"
                  className="delete_cart_item"
                  onClick={onClickDeleteCartItem}
                  type="button"
                >
                  <ImCross />
                </button>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartListView
