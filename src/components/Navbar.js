import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { add } from "../store/cartSlice";
import { setProducts } from "../store/productSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  // const [backupData, setbackupData] = useState([]);
  const { data: products, status } = useSelector((state) => state.product);
  const { Favourite: favoriteData } = useSelector((state) => state.product);
  const { backup } = useSelector((state) => state.product);
  const [scroll, setScroll] = useState(false);

  // console.log('------ favoriteDtaa ------', favoriteDtaa)


  const handleInputChange = (e) => {
    e.preventDefault();
    let value = e.target.value
    setSearchInput(value);
    if (e.target.value) {
      let filterData = products.filter((product) => {
        if (product.title.toLowerCase().includes(value.toLowerCase())) {
          return product;
        }
      });
      dispatch(setProducts(filterData));
    } else {
      dispatch(setProducts(backup));
    }
    console.log("---- filterData -------", backup);
  };

  const handleSearch = () => {};

  const items = useSelector((state) => state.cart);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <header className={`headerMain ${scroll ? "sticky" : ""}`}>
      <div
    
    style={{
      backgroundColor: "skyblue",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 4,
    }}
  >
    <span className="logo">SHOPPING STORE</span>
    <div>
      <input
        type="text"
        placeholder="Search here"
        value={searchInput}
        onChange={handleInputChange}
        className="big-search-box"
      />
      {/* <button className="big-search-box-search" onClick={handleSearch}>
        search
      </button> */}

      <Link className="navLink" to="/">
        Product
      </Link>
      <Link className="navLink-wish" to="/favourite">
        Wishlist
        {/* <Favora */}
        {favoriteData?.length > 0 && (
          <span className="cartCount">({favoriteData?.length})</span>
        )}
      </Link>

      <Link className="navLink-cart" to="/cart">
        <FaShoppingCart className="navIcons" />
        {items.length > 0 && (
          <span className="cartCount">({items.length})</span>
        )}
      </Link>

      {/* <span className="cartCount">Cart items: {items.length}</span> */}
    </div>
  </div>
    </header>
  );
};

export default Navbar;
