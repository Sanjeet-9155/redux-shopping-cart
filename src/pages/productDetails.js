import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";
import productSlice, { setFavirateData } from "../store/productSlice";

const ProductDetails = () => {
  const navigation = useLocation();
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const [productData, setProductData] = useState(
    navigation.state.productDetails
  );

  const handleAddToCart = () => {
    dispatch(add(productData));
  };

  const handleAddToFavourite = (data) => {
    // console.log("---- data ----", data);
    dispatch(setFavirateData(data));
    const isFavourite = favourites.some((item) => item.id === productData.id);
    if (!isFavourite) {
      setFavourites([...favourites, productData]);
      setFavouritesCount(favouritesCount + 1);
    }
  };

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={productData?.image} alt={productData?.name} />
      </div>
      <div className="product-info">
        <h1>{productData?.name}</h1>
        <h4>{productData?.category}</h4>
        <p className="price">${productData?.price}</p>
        <div className="rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-count">(120 ratings)</span>
        </div>
        <p className="description">{productData?.description}</p>
        <div className="offers">
          <h3>Available Offers:</h3>
          <ul>
            <li>10% off on your first purchase</li>
            <li>Buy 1 Get 1 Free on select items</li>
            <li>Free shipping on orders over $50</li>
          </ul>
        </div>
        <div className="addbox">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button
            className="add-to-cart"
            onClick={() => handleAddToFavourite(productData)}
          >
            Add to Favourite
          </button>
        </div>
        <div>
          <p>Favourite Count: {favouritesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
