import { configureStore } from "@reduxjs/toolkit";
import { productsActions, productsReducer } from "../features/products";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(handleStatus),
  });
  return store;
}

const handleStatus = (store) => (next) => (action) => {
  let result = next(action);
  if (action.payload?.status) {
    console.log("Response Status :", action.payload.status);
  }
  return result;
};
