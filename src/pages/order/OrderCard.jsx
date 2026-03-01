import dayjs from "dayjs";
import { formatPrice } from "../../utils/price";
import "./OrderCard.css";
import OrderProductRow from "./OrderProductRow";

const OrderCard = ({ eachOrder, loadCart }) => {
  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{dayjs(eachOrder.orderTimeMs).format("MMMM,D")}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>{formatPrice(eachOrder.totalCostCents)}</div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{eachOrder.id}</div>
        </div>
      </div>

      <div className="order-details-grid">
        {eachOrder.products.map((orderedProduct) => {
          return (
            <OrderProductRow
              key={orderedProduct.product.id}
              orderedProduct={orderedProduct}
              loadCart={loadCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;
