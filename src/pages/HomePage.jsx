import "./header.css";
import "./HomePage.css";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import{formatPrice} from '../utils/price.js'

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
        <div className="products-grid">
          {products.map((eachProduct) => {
            return (
              <div key={eachProduct.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={eachProduct.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {eachProduct.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${eachProduct.rating.stars * 10}.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {eachProduct.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  {
                    formatPrice(eachProduct.priceCents)
                  }
                </div>

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>
                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
