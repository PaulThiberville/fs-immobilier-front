import { configureStore } from "@reduxjs/toolkit";
import { citiesReducer } from "../features/cities";
import { productReducer } from "../features/product";
import { productsReducer } from "../features/products";
import { typesReducer } from "../features/types";
import { userActions, userReducer } from "../features/user";
import { submitReducer } from "../features/submit";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      product: productReducer,
      user: userReducer,
      types: typesReducer,
      cities: citiesReducer,
      submit: submitReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(handleTokenExpiration, handleStatus),
  });
  return store;
}

const handleStatus = store => next => action => {
  let nextAction = next(action);
  if (action.payload?.status === 401) {
    console.log("Received 401");
    nextAction = next(store.dispatch(userActions.logout()));
  }
  return nextAction;
};

const handleTokenExpiration = store => next => action => {
  let nextAction = next(action);
  if (store.getState().user?.value?.expiresAt <= Date.now()) {
    console.log("Session expired");
    nextAction = next(store.dispatch(userActions.logout()));
  }
  return nextAction;
};
