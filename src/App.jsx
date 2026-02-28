import { useState, useEffect } from "react";
import HomePage from "./pages/home/HomePage.jsx";
import CheckOut from "./pages/checkout/CheckOut.jsx";
import Orders from "./pages/order/Orders.jsx";
import "./App.css";
import { Routes, Route } from "react-router";
import Tracking from "./pages/Tracking.jsx";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      // console.log(response.data);
      setCart(response.data);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage  cart={cart}/>} /> // path='/'
        <Route path="/checkout" element={<CheckOut cart={cart} />} />
        <Route path="/orders" element={<Orders  cart={cart}  />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
