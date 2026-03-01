import { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import OrderCard from "./OrderCard";

import "./Orders.css";

const Orders = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="orders-grid">
          {orders.map((eachOrder) => {
            return <OrderCard key={eachOrder.id} eachOrder={eachOrder} loadCart={loadCart} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
