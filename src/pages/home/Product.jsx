import axios from "axios";
import { useState } from "react";
import { formatPrice } from "../../utils/price";

const Product = ({ eachProduct, loadCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: eachProduct.id,
      quantity,
    });
    await loadCart();

    setShowAdded(true);

    setTimeout(() => {
      setShowAdded(false);
    }, 2000);
  };
  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
    // console.log(quantitySelected);
  };
  return (
    <div>
      <div className="product-container">
        <div className="product-image-container">
          <img className="product-image" src={eachProduct.image} />
        </div>

        <div className="product-name limit-text-to-2-lines">
          {eachProduct.name}
        </div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`images/ratings/rating-${eachProduct.rating.stars * 10}.png`}
          />
          <div className="product-rating-count link-primary">
            {eachProduct.rating.count}
          </div>
        </div>
        <div className="product-price">
          {formatPrice(eachProduct.priceCents)}
        </div>
        <div className="product-quantity-container">
          <select value={quantity} onChange={selectQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="product-spacer"></div>
        {showAdded && (
          <div className="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>
        )}

        <button
          className="add-to-cart-button button-primary"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
