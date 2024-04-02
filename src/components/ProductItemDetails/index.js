// Write your code here
import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'

import CartContext from '../../context/CartContext'

import './index.css'

class ProductItemDetails extends Component {
  state = {count: 1, productDetails: '', similarProduct: [], urlStatus: ''}

  componentDidMount() {
    this.getProductDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    title: data.title,
    price: data.price,
    description: data.description,
    brand: data.brand,
    totalReviews: data.total_reviews,
    rating: data.rating,
    availability: data.availability,
  })

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({urlStatus: 'isLoading'})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarProduct = fetchedData.similar_products.map(
        eachProduct => this.getFormattedData(eachProduct),
      )
      console.log(updatedData.description)
      console.log(updatedSimilarProduct)
      this.setState({
        productDetails: updatedData,
        similarProduct: updatedSimilarProduct,
        urlStatus: 'success',
      })
    } else {
      this.setState({urlStatus: 'failure'})
      this.renderFailure()
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  renderProductDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItemList} = value

        const {count, productDetails, similarProduct} = this.state
        const {
          imageUrl,
          title,
          price,
          description,
          brand,
          totalReview,
          rating,
          availability,
        } = productDetails

        const onClickAddToCart = () => {
          addCartItemList({...productDetails, count})
        }

        return (
          <>
            <div className="product_details_container">
              <img
                className="product_details_img"
                src={imageUrl}
                alt="product"
              />
              <div className="product_details_section">
                <div>
                  <h1 className="product_details_heading">{title}</h1>
                  <p className="product_details_price">Rs {price}/-</p>
                </div>
                <div className="product_details_rating_container">
                  <p className="product_details_rating">
                    {rating}
                    <img
                      className="star_image"
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                    />
                  </p>
                  <p className="product_details_reviews">
                    {totalReview} Reviews
                  </p>
                </div>
                <p className="product_details_description">{description}</p>
                <div>
                  <p className="product_details_available">Availability:</p>
                  <p className="product_details_available_value">
                    {availability}
                  </p>
                </div>{' '}
                <div>
                  <p className="product_details_available">Brand:</p>
                  <p className="product_details_available_value">{brand}</p>
                </div>
                <hr />
                <div className="product_details_quantity_container">
                  <button
                    aria-label="minus_quantity"
                    type="button"
                    data-testid="minus"
                    onClick={this.onDecrement}
                    className="add_product_button"
                  >
                    <BsDashSquare />
                  </button>
                  <p className="add_product_num">{count}</p>
                  <button
                    aria-label="plus_quantity"
                    data-testid="plus"
                    onClick={this.onIncrement}
                    className="add_product_button"
                    type="button"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <div>
                  <button
                    className="product_details_add_button"
                    type="button"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            <div className="similar_product_container">
              <h1 className="sp_heading">Similar Products</h1>
              <ul className="similar_product_card_container">
                {similarProduct.map(eachProduct => (
                  <SimilarProductItem
                    spDetails={eachProduct}
                    key={eachProduct.id}
                  />
                ))}
              </ul>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure_container">
      <img
        className="failure_img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button
          onClick={this.onClickContinue}
          className="failure_button"
          type="button"
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  displayProductDetails = () => {
    const {urlStatus} = this.state

    switch (urlStatus) {
      case 'success':
        return this.renderProductDetails()
      case 'failure':
        return this.renderFailure()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.displayProductDetails()}
      </div>
    )
  }
}

export default ProductItemDetails
