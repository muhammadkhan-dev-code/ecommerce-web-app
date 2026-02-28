import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/price.js";
import "./checkout-header.css";
import "./CheckOut.css";

const CheckOut = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });

    axios.get("/api/payment-summary").then((response) => {
      // console.log("hi",response)
      setPaymentSummary(response.data);
    });
  }, []);

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout :-
            <a className="return-to-home-link" href="/">
              {cart?.length || 0} items
            </a>
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
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
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs,
                      ).format("dddd,MMMM,D")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={eachCart.product.image}
                        alt={eachCart.product.name}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {eachCart.product.name}
                        </div>

                        <div className="product-price">
                          {formatPrice(eachCart.product.priceCents)}
                        </div>

                        <div className="product-quantity">
                          Quantity:
                          <span className="quantity-label">
                            {eachCart.quantity}
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>

                        {deliveryOptions?.map((eachDeliveryOption) => {
                          let priceString = "FREE Shipping";

                          if (eachDeliveryOption.priceCents > 0) {
                            priceString = `${formatPrice(
                              eachDeliveryOption.priceCents,
                            )} - Shipping`;
                          }

                          return (
                            <div
                              className="delivery-option"
                              key={eachDeliveryOption.id}
                            >
                              <input
                                type="radio"
                                checked={
                                  eachDeliveryOption.id ===
                                  eachCart.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${eachCart.productId}`}
                              />

                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    eachDeliveryOption.estimatedDeliveryTimeMs,
                                  ).format("dddd, MMMM D")}
                                </div>

                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {
              
            paymentSummary && (
              
              <>
              {console.log(" payment ", paymentSummary)}
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row ">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row  subtotal-row">
                  <div>Total Before Tex</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>
                <div className="payment-summary-row ">
                  <div>Estimated Tex - 10% </div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.taxCents)}
                  </div>
                </div>
                <div className="payment-summary-row total-row ">
                  <div>Order Total: </div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
