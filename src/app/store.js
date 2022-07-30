import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products";

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});
