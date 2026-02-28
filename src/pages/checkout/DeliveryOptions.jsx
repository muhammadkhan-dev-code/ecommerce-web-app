import React from "react";
import { formatPrice } from "../../utils/price";
import dayjs from "dayjs";
import axios from "axios";
const DeliveryOptions = ({ eachCart, deliveryOptions,loadCart }) => {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions?.map((eachDeliveryOption) => {
        let priceString = "FREE Shipping";

        if (eachDeliveryOption.priceCents > 0) {
          priceString = `${formatPrice(
            eachDeliveryOption.priceCents,
          )} - Shipping`;
        }

        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-items/${eachCart.productId}`, {
            deliveryOptionId:eachDeliveryOption.id
          });

          await loadCart();

        };

        return (
          <div
            className="delivery-option"
            key={eachDeliveryOption.id}
            onClick={updateDeliveryOption}
          >
            <input
              type="radio"
              checked={eachDeliveryOption.id === eachCart.deliveryOptionId}
              onChange={()=>{}}
              className="delivery-option-input"
              name={`delivery-option-${eachCart.productId}`}
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(eachDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryOptions;
