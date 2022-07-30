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
    setProducts: setProducts(),
  };

  function setProducts() {
    return createAsyncThunk(`${name}/setProducts`, async () => {
      const response = await fetch(baseUrl + "/product/");
      return { status: response.status, data: await response.json() };
    });
  }
}

function createExtraReducers() {
  return {
    ...setProducts(),
  };

  function setProducts() {
    var { pending, fulfilled, rejected } = extraActions.setProducts;
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
}
