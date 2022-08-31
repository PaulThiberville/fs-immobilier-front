import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

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
    return createAsyncThunk(`${name}/getTypes`, async () => {
      return customFetch({ route: "/type/" });
    });
  }

  function addType() {
    return createAsyncThunk(`${name}/addType`, async ({ user, type }) => {
      return customFetch({
        route: "/type/",
        verb: "POST",
        data: { value: type },
      });
    });
  }

  function removeType() {
    return createAsyncThunk(`${name}/removeType`, async ({ user, typeId }) => {
      const response = await fetch(baseUrl + "/Type/" + typeId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });
      return customFetch({
        route: "/type/" + typeId,
        verb: "DELETE",
        token: user.token,
      });
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

  function addType() {
    var { pending, fulfilled, rejected } = extraActions.addType;
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

  function removeType() {
    var { pending, fulfilled, rejected } = extraActions.removeType;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          state.value = [...state.value].filter(Type => {
            return Type._id !== action.payload.data._id;
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
