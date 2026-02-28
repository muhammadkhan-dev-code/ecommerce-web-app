import "../header.css";
import "./HomePage.css";
import Header from "../../components/Header.jsx";
import axios from "axios";
import ProductGrid from "./ProductGrid.jsx";
import { useEffect, useState } from "react";

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((responseData) => {
      setProducts(responseData.data);
    });
  }, []); // dependency array just one time run

  return (
    <>
      <title>ecommerse Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  );
};

export default HomePage;
