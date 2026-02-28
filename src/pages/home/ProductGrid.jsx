import React from "react";
import Product from "./Product.jsx";

const ProductGrid = ({ products, loadCart }) => {
  return (
    <div className="products-grid">
      {products.map((eachProduct) => {
        return <Product  key={eachProduct.id} eachProduct={eachProduct} loadCart={loadCart} />;
      })}
    </div>
  );
};

export default ProductGrid;
