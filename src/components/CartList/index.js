import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'

import './index.css'

const CartList = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul>
          {cartList.map(eachItem => (
            <CartListView cartProduct={eachItem} key={eachItem.id} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartList
