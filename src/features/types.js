import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "types";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const typesActions = { ...slice.actions, ...extraActions };
export const typesReducer = slice.reducer;

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
    getTypes: getTypes(),
    addType: addType(),
    removeType: removeType(),
  };

  function getTypes() {
    return createAsyncThunk(`${name}/getTypes`, async (user) => {
      const response = await fetch(baseUrl + "/type/", {
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

  function addType() {
    return createAsyncThunk(`${name}/addType`, async ({ user, typeId }) => {
      const response = await fetch(baseUrl + "/type/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({ value: typeId }),
      });
      return { status: response.status, data: await response.json() };
    });
  }

  function removeType() {
    return createAsyncThunk(`${name}/removeType`, async (user) => {
      const response = await fetch(baseUrl + "/type/", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });
      return { status: response.status, data: await response.json() };
    });
  }
}

function createExtraReducers() {
  return {
    ...getTypes(),
    ...addType(),
    ...removeType(),
  };

  function getTypes() {
    var { pending, fulfilled, rejected } = extraActions.getTypes;
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

  function addType() {
    var { pending, fulfilled, rejected } = extraActions.addType;
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

  function removeType() {
    var { pending, fulfilled, rejected } = extraActions.removeType;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value].filter((type) => {
            return type._id !== action.payload.data._id;
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
