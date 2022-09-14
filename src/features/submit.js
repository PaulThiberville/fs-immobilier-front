import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "submit";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const submitActions = { ...slice.actions, ...extraActions };
export const submitReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    type: { value: "", error: "" },
    category: { value: "", error: "" },
    description: { value: "", error: "" },
    price: { value: 0, error: "" },
    city: { value: "", error: "" },
    surface: { value: 0, error: "" },
    rooms: { value: 0, error: "" },
    bedrooms: { value: 0, error: "" },
    images: { value: [], error: "" },
    isUserValid: false,
    isProductValid: false,
    isImagesValid: false,
  };
}

function createReducers() {
  return {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSurface: (state, action) => {
      state.surface = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setIsUserValid: (state, action) => {
      state.isUserValid = action.payload;
    },
    setIsProductValid: (state, action) => {
      state.isProductValid = action.payload;
    },
    setIsImagesValid: (state, action) => {
      state.isImagesValid = action.payload;
    },
  };
}

function createExtraActions() {}

function createExtraReducers() {}
