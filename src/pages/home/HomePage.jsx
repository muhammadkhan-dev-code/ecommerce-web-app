import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import "../header.css";
import "./HomePage.css";
import ProductGrid from "./ProductGrid.jsx";
import { useSearchParams } from "react-router";

const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };
    getHomeData();
  }, [search]); // dependency array just one time run

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
