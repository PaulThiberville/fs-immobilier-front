import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

// create slice

const name = "user";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const userReducer = slice.reducer;

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
    logout: state => {
      localStorage.clear();
      state.value = undefined;
    },
    setUser: (state, action) => {
      state.value = action.payload;
    },
  };
}

function createExtraActions() {
  const baseUrl = process.env.REACT_APP_API_URL;

  return {
    login: login(),
  };

  function login() {
    return createAsyncThunk(`${name}/login`, async credentials => {
      return customFetch({
        route: "/user/login",
        verb: "POST",
        data: credentials,
      });
    });
  }
}

function createExtraReducers() {
  return {
    ...login(),
  };

  function login() {
    var { pending, fulfilled, rejected } = extraActions.login;
    return {
      [pending]: state => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          localStorage.setItem("user", JSON.stringify(action.payload.data));
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
}
