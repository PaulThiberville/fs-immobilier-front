import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "products";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const productsActions = { ...slice.actions, ...extraActions };
export const productsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    value: [],
    loading: false,
    error: "",
  };
}

function createExtraActions() {
  const baseUrl = process.env.REACT_APP_API_URL;

  return {
    getProducts: getProducts(),
    getProduct: getProduct(),
    addProduct: addProduct(),
    removeProduct: removeProduct(),
    editProduct: editProduct(),
    removeImage: removeImage(),
  };

  function getProducts() {
    return createAsyncThunk(`${name}/getProducts`, async (options) => {
      const response = await fetch(baseUrl + "/product/search/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      return { status: response.status, data: await response.json() };
    });
  }

  function getProduct() {
    return createAsyncThunk(`${name}/getProduct`, async (productId) => {
      const response = await fetch(baseUrl + "/product/" + productId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return { status: response.status, data: await response.json() };
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
    ...getProducts(),
    ...getProduct(),
    ...addProduct(),
    ...removeProduct(),
    ...editProduct(),
    ...removeImage(),
  };

  function getProducts() {
    var { pending, fulfilled, rejected } = extraActions.getProducts;
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
          state.value = [action.payload.data];
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

  function addProduct() {
    var { pending, fulfilled, rejected } = extraActions.addProduct;
    return {
      [pending]: (state) => {
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

  function removeProduct() {
    var { pending, fulfilled, rejected } = extraActions.removeProduct;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value].filter((product) => {
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
