import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import "../header.css";
import "./HomePage.css";
import ProductGrid from "./ProductGrid.jsx";

const HomePage = ({ cart,loadCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []); // dependency array just one time run

  return (
    <>
      <title>ecommerse Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
};

export default HomePage;
