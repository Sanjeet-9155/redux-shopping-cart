import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { data: products, status } = useSelector((state) => state.product);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(add(product));
    console.log(product);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <div className="filter-section" style={{ marginBottom: "20px" }}>
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelry</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      {filteredProducts.length === 0 && <div>No Record Found</div>}

      <div className="productsWrapper">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <div
              onClick={() =>
                navigation("/productDetails", {
                  state: { productDetails: product },
                })
              }
            >
              <img src={product.image} alt="" />
              <h4>{product.title}</h4>
              <h5>{product.price}</h5>
            </div>
            <button onClick={() => handleAdd(product)} className="btn">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
