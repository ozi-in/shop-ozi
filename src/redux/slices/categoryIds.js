import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategories: [],
  storeSelectedItems: [],
  storeSelectedItems2: [],
  filterData: [],
  rating_count: 0,
  selectedBrands: [],
  interestId: [],
  existingModuleId: [],

  selectedCategoryId: null, // saksham Changes
  selectedSubCategoryId: null,
};

export const categoryIdsSlice = createSlice({
  name: "categoryids",
  initialState,
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setStoreSelectedItems: (state, action) => {
      state.storeSelectedItems = action.payload;
    },
    setStoreSelectedItems2: (state, action) => {
      state.storeSelectedItems2 = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setSelectedBrands: (state, action) => {
      state.selectedBrands = action.payload;
    },
    setRating_Count: (state, action) => {
      state.rating_count = action.payload;
    },
    setInterestId: (state, action) => {
      state.interestId = action.payload;
    },
    setExistingModuleIds: (state, action) => {
      state.existingModuleId = [...state.existingModuleId, action.payload];
    },
    setSelectedCategoryId: (state, action) => {
      //saksham changes
      state.selectedCategoryId = action.payload;
    },
    setSelectedSubCategoryId: (state, action) => {
      state.selectedSubCategoryId = action.payload;
    },
    resetCategoryId: (state) => {
      state.selectedCategoryId = null;
      state.selectedSubCategoryId = null;
      localStorage.removeItem("sort_by");
      localStorage.removeItem("selected_sub_highlighted_categories");
      localStorage.removeItem("selected_highlighted_categories");
      localStorage.removeItem("price_range");
      localStorage.removeItem("set_view");
      localStorage.removeItem("filter_data");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setInterestId,
  setRating_Count,
  setSelectedCategories,
  setStoreSelectedItems,
  setFilterData,
  setSelectedBrands,
  setStoreSelectedItems2,
  setExistingModuleIds,
  setSelectedCategoryId, // saksham changes
  setSelectedSubCategoryId,
  resetCategoryId,
} = categoryIdsSlice.actions;
export default categoryIdsSlice.reducer;
