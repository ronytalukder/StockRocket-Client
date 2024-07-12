import { createSlice } from "@reduxjs/toolkit";

export const returnSlice = createSlice({
    name: 'return',

    initialState: {
        returns: [], 
        list: 0,
        formValue : {
            customerId: "",
            discount: 0,
            vatTax: 0,
            shippingCost: 0,
            otherCost: 0,
            grandTotal: 0,
            details: "",
        },
        customerDropDown: [],
        productDropDown: [],
        selectedProductItems: []
    },
    
    reducers: {
        setFormValue: (state, action) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setReturns: (state, action) => {
            state.returns = action.payload;
        },
        setTotal: (state, action) => {
            state.list = action.payload;
        },
        setCustomerDropDown: (state, action) => {
            state.customerDropDown = action.payload;
        },
        setProductDropDown: (state, action) => {
            state.productDropDown = action.payload;
        },
        setSelectedProductItems: (state, action) => {
            state.selectedProductItems.push(action.payload);
        },
        removeSelectedProductItems: (state, action) => {
            state.selectedProductItems.splice(action.payload, 1);
        },
        resetForm: (state) => {
            state.formValue = {
                customerId: "",
                discount: 0,
                vatTax: 0,
                shippingCost: 0,
                otherCost: 0,
                grandTotal: 0,
                details: "",
            };
            state.selectedProductItems = [];
        }
    }
});
export const { setFormValue, setReturns, setTotal, setCustomerDropDown, setProductDropDown, setSelectedProductItems, removeSelectedProductItems, resetForm } = returnSlice.actions;
export default returnSlice.reducer