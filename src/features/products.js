import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

// create slice

const name = "products";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const productsActions = { ...slice.actions, ...extraActions };
export const productsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    value: undefined,
    page: 0,
    limit: 6,
    full: false,
    loading: false,
    error: "",
  };
}

function createReducers() {
  return {
    reinit: state => {
      state.value = undefined;
      state.page = 0;
      state.limit = 6;
      state.full = false;
      state.loading = false;
      state.error = "";
    },
  };
}

function createExtraActions() {
  //const baseUrl = process.env.REACT_APP_API_URL;
  const baseUrl = "http://localhost:5000";
  return {
    getProducts: getProducts(),
    getMoreProducts: getMoreProducts(),
    getAllProducts: getAllProducts(),
    addProduct: addProduct(),
    removeProduct: removeProduct(),
  };

  function getProducts() {
    return createAsyncThunk(
      `${name}/getProducts`,
      async (options, { getState }) => {
        const state = getState();
        const newOptions = {
          ...options,
          offset: 0,
          limit: state.products.limit,
        };
        const response = await fetch(baseUrl + "/product/search/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOptions),
        });
        return { status: response.status, data: await response.json() };
      }
    );
  }

  function getMoreProducts() {
    return createAsyncThunk(
      `${name}/getMoreProducts`,
      async (options, { getState }) => {
        const state = getState();
        const newOptions = {
          ...options,
          offset: state.products.limit * state.products.page + 1,
          limit: state.products.limit,
        };
        const response = await fetch(baseUrl + "/product/search/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOptions),
        });
        return { status: response.status, data: await response.json() };
      }
    );
  }

  function getAllProducts() {
    return createAsyncThunk(`${name}/getAllProducts`, async () => {
      return customFetch({ route: "/product/search", verb: "POST", data: {} });
    });
  }

  function addProduct() {
    return createAsyncThunk(`${name}/addProduct`, async ({ user, product }) => {
      const response = await fetch(baseUrl + "/product/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(product),
      });
      return { status: response.status, data: await response.json() };
    });
  }

  function removeProduct() {
    return createAsyncThunk(
      `${name}/removeProduct`,
      async ({ user, productId }) => {
        const response = await fetch(baseUrl + "/product/" + productId, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        });
        return { status: response.status, data: await response.json() };
      }
    );
  }
}

function createExtraReducers() {
  return {
    ...getProducts(),
    ...getMoreProducts(),
    ...getAllProducts(),
    ...addProduct(),
    ...removeProduct(),
  };

  function getProducts() {
    var { pending, fulfilled, rejected } = extraActions.getProducts;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          if (action.payload.data.count <= state.limit) {
            state.full = true;
          } else {
            state.full = false;
          }
          state.value = [...action.payload.data.products];
          state.page++;
          state.error = "";
        }
      },
      [rejected]: (state, action) => {
        state.loading = false;
        if (action.error) {
          state.error = action.error.message;
        }
      },
    };
  }

  function getMoreProducts() {
    var { pending, fulfilled, rejected } = extraActions.getMoreProducts;
    return {
      [pending]: state => {
        state.loading = false;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value, ...action.payload.data.products];
          if (
            action.payload.data.count <=
            state.page * state.limit + state.limit
          ) {
            state.full = true;
          }
          state.page++;
        }
      },
      [rejected]: (state, action) => {
        state.loading = false;
        if (action.error) {
          state.error = action.error.message;
        }
      },
    };
  }

  function getAllProducts() {
    var { pending, fulfilled, rejected } = extraActions.getAllProducts;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.products) {
          state.value = action.payload.data.products;
        }
        console.log("fullfiled :", action.payload.data);
      },
      [rejected]: (state, action) => {
        state.loading = false;
        console.log("rejected :", action.payload.data);
      },
    };
  }

  function addProduct() {
    var { pending, fulfilled, rejected } = extraActions.addProduct;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value, action.payload.data];
        }
      },
      [rejected]: (state, action) => {
        state.loading = false;
        if (action.error) {
          state.error = action.error.message;
        }
      },
    };
  }

  function removeProduct() {
    var { pending, fulfilled, rejected } = extraActions.removeProduct;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value].filter(product => {
            return product._id !== action.payload.data._id;
          });
        }
      },
      [rejected]: (state, action) => {
        state.loading = false;
        if (action.error) {
          state.error = action.error.message;
        }
      },
    };
  }
}
