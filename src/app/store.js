import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../features/products";
import { userReducer } from "../features/user";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      user: userReducer,
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
