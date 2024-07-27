import { createSlice } from "@reduxjs/toolkit";

export const purchaseSlice = createSlice({
    name: 'purchase',

    initialState: {
        purchases: [], 
        list: 0,
        formValue : {
            supplierId: "",
            discount: 0,
            vatTax: 0,
            shippingCost: 0,
            otherCost: 0,
            grandTotal: 0,
            details: "",
        },
        supplierDropDown: [],
        productDropDown: [],
        selectedProductItems: []
    },
    
    reducers: {
        setFormValue: (state, action) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setPurchases: (state, action) => {
            state.purchases = action.payload;
        },
        setTotal: (state, action) => {
            state.list = action.payload;
        },
        setSupplierDropDown: (state, action) => {
            state.supplierDropDown = action.payload;
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
                supplierId: "",
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

export const { setFormValue, setPurchases, setTotal, setSupplierDropDown, setProductDropDown, setSelectedProductItems, removeSelectedProductItems, resetForm } = purchaseSlice.actions;
export default purchaseSlice.reducer;
