import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../features/products";
import { categoriesReducer } from "../features/cotegories";
import { userActions, userReducer } from "../features/user";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      user: userReducer,
      categories: categoriesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(handleStatus),
  });
  return store;
}

const handleStatus = (store) => (next) => (action) => {
  let nextAction = next(action);
  if (action.payload?.data) {
    //console.log("received data :", action.payload.data);
  }
  if (action.payload?.status === 401) {
    console.log("Received 401");
    nextAction = next(store.dispatch(userActions.logout()));
  }
  return nextAction;
};
