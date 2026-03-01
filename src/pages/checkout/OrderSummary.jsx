import dayjs from "dayjs";
import axios from "axios";
import { formatPrice } from "../../utils/price";
import "./CheckOut.css";
import DeliveryOptions from "./DeliveryOptions";
import { useState } from "react";
const OrderSummary = ({ cart, deliveryOptions, loadCart }) => {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cart.quantity);

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart?.map((eachCart) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === eachCart.deliveryOptionId;
            },
          );

          const deleteCartItem = async () => {
            let deletedItem = await axios.delete(
              `/api/cart-items/${eachCart.productId}`,
            );
            console.log(deletedItem);

            await loadCart();
          };

          const updateQuantity = async () => {
            if (isUpdatingQuantity) {
              await axios.put(`/api/cart-items/${eachCart.productId}`, {
                quantity: Number(quantity),
              });
              await loadCart();
              setIsUpdatingQuantity(false);
            } else {
              setIsUpdatingQuantity(true);
            }
          };

          const updateQuantityInput = (event) => {
            setQuantity(event.target.value);
          };

          const handleQuantityKeyDown = (event) => {
            const keyPressed = event.key;

            if (keyPressed === "Enter") {
              updateQuantity();
            } else if (keyPressed === "Escape") {
              setQuantity(eachCart.quantity);
              setIsUpdatingQuantity(false);
            }
          };

          return (
            <div className="cart-item-container" key={eachCart.productId}>
              <div className="delivery-date">
                Delivery date :{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd,MMMM,D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={eachCart.product.image}
                  alt={eachCart.product.name}
                />

                <div className="cart-item-details">
                  <div className="product-name">{eachCart.product.name}</div>

                  <div className="product-price">
                    {formatPrice(eachCart.product.priceCents)}
                  </div>

                  <div className="product-quantity">
                    Quantity:
                    {isUpdatingQuantity ? (
                      <input
                        type="text"
                        style={{ width: "50px" }}
                        value={quantity}
                        onChange={updateQuantityInput}
                        onKeyDown={handleQuantityKeyDown}
                      />
                    ) : (
                      <span className="quantity-label">
                        {eachCart.quantity}
                      </span>
                    )}
                    <span
                      className="update-quantity-link link-primary"
                      onClick={updateQuantity}
                    >
                      Update
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions
                  eachCart={eachCart}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderSummary;
