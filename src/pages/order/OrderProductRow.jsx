import axios from "axios";
import dayjs from "dayjs";
import "./OrderProductRow.css";

const OrderProductRow = ({ orderedProduct, loadCart }) => {
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: orderedProduct.product.id,
      quantity: 1,
    });
    await loadCart();
  };

  return (
    <>
      <div className="product-image-container">
        <img src={orderedProduct.product.image} alt={orderedProduct.product.name} />
      </div>

      <div className="product-details">
        <div className="product-name">{orderedProduct.product.name}</div>
        <div className="product-delivery-date">
          {dayjs(orderedProduct.estimatedDeliveryTimeMs).format("MMMM,D")}
        </div>
        <div className="product-quantity">Quantity: {orderedProduct.quantity}</div>
        <button className="buy-again-button button-primary" onClick={addToCart}>
          <img className="buy-again-icon" src="images/icons/buy-again.png" alt="Add to cart" />
          <span className="buy-again-message">Add to Cart</span>
        </button>
      </div>

      <div className="product-actions">
        <a href="/tracking">
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    </>
  );
};

export default OrderProductRow;
