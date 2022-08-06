import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    clear: (state) => {
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
    return createAsyncThunk(`${name}/getProduct`, async (productId) => {
      const response = await fetch(baseUrl + "/product/" + productId);
      return { status: response.status, data: await response.json() };
    });
  }

  function editProduct() {
    return createAsyncThunk(
      `${name}/editProduct`,
      async ({ user, product, productId }) => {
        const response = await fetch(baseUrl + "/product/" + productId, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: JSON.stringify(product),
        });
        return { status: response.status, data: await response.json() };
      }
    );
  }

  function removeImage() {
    return createAsyncThunk(
      `${name}/removeImage`,
      async ({ user, imageId }) => {
        const response = await fetch(baseUrl + "/image/" + imageId, {
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
    ...getProduct(),
    ...removeImage(),
    ...editProduct(),
  };

  function getProduct() {
    var { pending, fulfilled, rejected } = extraActions.getProduct;
    return {
      [pending]: (state) => {
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
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value].map((product) => {
            if (product._id === action.payload.data._id) {
              return action.payload.data;
            }
            return product;
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

  function removeImage() {
    var { pending, fulfilled, rejected } = extraActions.removeImage;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value].map((product) => {
            if (product._id === action.payload.data._id) {
              return action.payload.data;
            }
            return product;
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
