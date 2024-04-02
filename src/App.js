import {Route, Switch, Redirect} from 'react-router-dom'

import {Component} from 'react'
import CartContext from './context/CartContext'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItemList = product => {
    const {cartList} = this.state
    const productAvailable = cartList.find(
      eachItem => eachItem.id === product.id,
    )
    if (productAvailable) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === productAvailable.id) {
            const updatedQuantity = eachItem.count + product.count
            return {...eachItem, count: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  deleteCartItemList = productID => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachItem => eachItem.id !== productID,
    )
    this.setState({cartList: filteredCartList})
  }

  removeAllCartItem = () => {
    this.setState({cartList: []})
  }

  incrementCartProductCount = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedCount = eachItem.count + 1
          return {...eachItem, count: updatedCount}
        }
        return eachItem
      }),
    }))
  }

  decrementCartProductCount = id => {
    const {cartList} = this.state
    const productAvailable = cartList.find(eachItem => eachItem.id === id)

    if (productAvailable.count > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const updatedCount = eachItem.count - 1
            return {...eachItem, count: updatedCount}
          }
          return eachItem
        }),
      }))
    } else {
      this.deleteCartItemList(id)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItemList: this.addCartItemList,
          deleteCartItemList: this.deleteCartItemList,
          removeAllCartItem: this.removeAllCartItem,
          incrementCartProductCount: this.incrementCartProductCount,
          decrementCartProductCount: this.decrementCartProductCount,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
