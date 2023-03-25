import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  sort: "-createdAt",
  limit: 10,
  category: "",
  subCategory: "",
  minPriceValue: 0,
  maxPriceValue: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleSetPageToState: (state, action) => {
      state.page = action.payload;
    },
    handleSetSortToState: (state, action) => {
      state.sort = action.payload;
    },
    handleSetLimitToState: (state, action) => {
      state.limit = Number(action.payload);
    },
    handleAllCollectionFilter: (state, action) => {
      state.filter = action.payload;
    },
    handleSetMinPriceToState: (state, action) => {
      state.minPriceValue = action.payload;
    },
    handleSetMaxPriceToState: (state, action) => {
      state.maxPriceValue = action.payload;
    },
  },
});

export const {
  handleSetPageToState,
  handleSetSortToState,
  handleSetLimitToState,
  handleAllCollectionFilter,
  handleSetMinPriceToState,
  handleSetMaxPriceToState,
} = productsSlice.actions;
export default productsSlice.reducer;