import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import favoritesReducer from './favoritesSlice';
const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        favorites: favoritesReducer,
    },
});

export default store;
