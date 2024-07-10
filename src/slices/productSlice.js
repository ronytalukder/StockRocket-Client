import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    list: 0,
    formValue: {
      categoryId: "",
      brandId: "",
      name: "",
      unit: "",
      details: "",
      images: []
    },
    brandDropDown: [],
    categoryDropDown: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTotal: (state, action) => {
      state.list = action.payload;
    },
    setBrandDropDown: (state, action) => {
      state.brandDropDown = action.payload;
    },
    setCategoryDropDown: (state, action) => {
      state.categoryDropDown = action.payload;
    },
    setFormValue: (state, action) => {
      state.formValue[action.payload.name] = action.payload.value; 
    },
    resetFormValue: (state) => {
      Object.keys(state.formValue).forEach((key) => {
        state.formValue[key] = key === 'images' ? [] : "";
      });
    }
  }
});

export const { setProducts, setTotal, setFormValue, resetFormValue, setBrandDropDown, setCategoryDropDown } = productSlice.actions;
export default productSlice.reducer;