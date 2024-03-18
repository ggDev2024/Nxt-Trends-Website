// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {spDetails} = props
  const {imageUrl, rating, price, title, brand} = spDetails

  return (
    <li className="similar_product_card">
      <img
        className="similar_product_card_img"
        src={imageUrl}
        alt="similar product"
      />
      <h1 className="similar_product_heading">{title}</h1>
      <p className="similar_product_description">by {brand}</p>
      <div className="similar_product_price_container">
        <h1>Rs {price}/-</h1>
        <div className="similar_product_reviews">
          {rating}{' '}
          <img
            className="star_image"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
