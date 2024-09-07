import React, { useEffect, useState } from "react";
import "./favourite.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { removeFavirate } from "../store/productSlice";

const Favourite = () => {
  const navigation = useLocation();
  const dispatch = useDispatch();
  const [favoriteCount, setFavoriteCount] = useState(0);
  // const [productData, setProductData] = useState(navigation.state.productDetails);
  const [isFavorite, setIsFavorite] = useState(false);
  const { Favourite: favoriteData } = useSelector((state) => state.product);

  // Add product to the cart and increment favorite count
  const handleAddFavorite = (index) => {
    dispatch(removeFavirate(index))
  };

  // Remove from favorites and decrement favorite count
  const handleRemoveFavorite = (index) => {
    console.log('call')
    dispatch(removeFavirate(1))
  };


  return (
    <>
    {
       favoriteData?.length > 0 &&  favoriteData.map((val, index) => {
        return(
          <div className="product-favourite">
      <div className="favorite-container">
        <div className="img-container">
          <img
            className="product-image"
            src={val?.image}
            alt={val?.name}
          />
        </div>

        <div className="product-info">
          <h4>{val?.name}</h4>
          <h4>{val?.category}</h4>
          <h3>${val?.price}</h3>
          <p>{val?.description}</p>
        </div>

        <div className="image-display">
          <button className="button-con" onClick={()=>handleRemoveFavorite(index)}>
            Remove from Favorite
          </button>
          <button className="button-con" onClick={handleAddFavorite} disabled={isFavorite}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
        )
       })
    }
    </>
  );
};

export default Favourite;
