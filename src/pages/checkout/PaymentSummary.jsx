import React from 'react'
import './CheckOut.css'
import { formatPrice } from '../../utils/price'
const PaymentSummary = ({paymentSummary}) => {
  return (
   
      
          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentSummary && (
              <>
                
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
   
  )
}

export default PaymentSummary
