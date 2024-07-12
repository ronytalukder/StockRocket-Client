import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    list: 0,
    formValue: {
      name: "",
    },
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTotal: (state, action) => {
      state.list = action.payload;
    },
    setFormValue: (state, action) => {
      state.formValue[`${action.payload.name}`] = action.payload.value;
    },
    resetFormValue: (state, action) => {
      Object.keys(state.formValue).forEach((key) => {
        state.formValue[key] = "";
      });
    },
  },
});

export const { resetFormValue, setCategories, setTotal, setFormValue } = categorySlice.actions;
export default categorySlice.reducer;
