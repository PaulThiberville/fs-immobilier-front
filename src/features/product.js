import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

// create slice

const name = "product";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const productActions = { ...slice.actions, ...extraActions };
export const productReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    value: undefined,
    loading: false,
    error: "",
  };
}

function createReducers() {
  return {
    clear: state => {
      state.value = undefined;
      state.loading = false;
      state.error = "";
    },
  };
}

function createExtraActions() {
  const baseUrl = process.env.REACT_APP_API_URL;

  return {
    getProduct: getProduct(),
    editProduct: editProduct(),
    removeImage: removeImage(),
  };

  function getProduct() {
    return createAsyncThunk(`${name}/getProduct`, async productId => {
      return await customFetch({ route: "/product/" + productId });
    });
  }

  function editProduct() {
    return createAsyncThunk(
      `${name}/editProduct`,
      async ({ user, product, productId }) => {
        return await customFetch({
          route: "/product/" + productId,
          verb: "PUT",
          data: product,
          token: user.token,
        });
      }
    );
  }

  function removeImage() {
    return createAsyncThunk(
      `${name}/removeImage`,
      async ({ user, imageId }) => {
        return customFetch({
          route: "/image/" + imageId,
          verb: "DELETE",
          token: user.token,
        });
      }
    );
  }
}

function createExtraReducers() {
  return {
    ...getProduct(),
    ...removeImage(),
    ...editProduct(),
  };

  function getProduct() {
    var { pending, fulfilled, rejected } = extraActions.getProduct;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = action.payload.data;
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

  function editProduct() {
    var { pending, fulfilled, rejected } = extraActions.editProduct;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = action.payload.data;
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

  function removeImage() {
    var { pending, fulfilled, rejected } = extraActions.removeImage;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          console.log("response:", action.payload.data);
          state.value = action.payload.data;
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
