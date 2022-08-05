import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "cities";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const citiesActions = { ...slice.actions, ...extraActions };
export const citiesReducer = slice.reducer;

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
    },
  };
}

function createExtraActions() {
  const baseUrl = process.env.REACT_APP_API_URL;

  return {
    getCities: getCities(),
  };

  function getCities() {
    return createAsyncThunk(`${name}/getCities`, async (input) => {
      console.log("getcities");
      const response = await fetch(baseUrl + "/cities/" + input);
      return { status: response.status, data: await response.json() };
    });
  }
}

function createExtraReducers() {
  return {
    ...getCities(),
  };

  function getCities() {
    var { pending, fulfilled, rejected } = extraActions.getCities;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        if (action.payload.data.error) {
          state.error = action.payload.data.error;
        } else {
          if (action.payload.data[0]) {
            state.value = action.payload.data[0].cities;
          } else {
            state.value = undefined;
          }
        }
      },
      [rejected]: (state, action) => {
        state.loading = false;
        if (action.error) {
          state.error = action.error.message;
          state.value = undefined;
        }
      },
    };
  }
}
