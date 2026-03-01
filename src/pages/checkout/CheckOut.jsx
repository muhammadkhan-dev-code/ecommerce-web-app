import axios from "axios";
import { useEffect, useState } from "react";
import "./CheckOut.css";
import CheckOutHeader from "../../components/CheckOutHeader.jsx";
import OrderSummary from "./OrderSummary.jsx";
import PaymentSummary from "./PaymentSummary.jsx";

const CheckOut = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);


  useEffect(() => {
    const fetchCheckOutData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };

    fetchCheckOutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);
  return (
    <>
      <CheckOutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
};

export default CheckOut;
