import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../features/products";
import { typesReducer } from "../features/types";
import { userActions, userReducer } from "../features/user";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      user: userReducer,
      types: typesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(handleStatus),
  });
  return store;
}

const handleStatus = (store) => (next) => (action) => {
  let nextAction = next(action);
  if (action.payload?.status === 401) {
    console.log("Received 401");
    nextAction = next(store.dispatch(userActions.logout()));
  }
  return nextAction;
};
