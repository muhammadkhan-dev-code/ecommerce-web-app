import React from "react";
import dayjs from "dayjs";
import { formatPrice } from "../../utils/price";
import "./CheckOut.css";
import DeliveryOptions from "./DeliveryOptions";
const OrderSummary = ({ cart, deliveryOptions }) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart?.map((eachCart) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === eachCart.deliveryOptionId;
            },
          );

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
                    <span className="quantity-label">{eachCart.quantity}</span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  eachCart={eachCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderSummary;
