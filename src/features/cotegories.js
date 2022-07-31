import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "categories";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const categoriesActions = { ...slice.actions, ...extraActions };
export const categoriesReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    value: undefined,
    loading: false,
    error: "",
  };
}

function createReducers() {
  return {};
}

function createExtraActions() {
  const baseUrl = process.env.REACT_APP_API_URL;

  return {
    getCategories: getCategories(),
    addCategory: addCategory(),
    removeCategory: removeCategory(),
  };

  function getCategories() {
    return createAsyncThunk(`${name}/getCategories`, async (user) => {
      const response = await fetch(baseUrl + "/category/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });
      return { status: response.status, data: await response.json() };
    });
  }

  function addCategory() {
    return createAsyncThunk(
      `${name}/addCategory`,
      async ({ user, category }) => {
        const response = await fetch(baseUrl + "/category/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: JSON.stringify({ value: category }),
        });
        return { status: response.status, data: await response.json() };
      }
    );
  }

  function removeCategory() {
    return createAsyncThunk(
      `${name}/removeCategory`,
      async ({ user, categoryId }) => {
        const response = await fetch(baseUrl + "/category/" + categoryId, {
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
    ...getCategories(),
    ...addCategory(),
    ...removeCategory(),
  };

  function getCategories() {
    var { pending, fulfilled, rejected } = extraActions.getCategories;
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

  function addCategory() {
    var { pending, fulfilled, rejected } = extraActions.addCategory;
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

  function removeCategory() {
    var { pending, fulfilled, rejected } = extraActions.removeCategory;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value].filter((category) => {
            return category._id !== action.payload.data._id;
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
