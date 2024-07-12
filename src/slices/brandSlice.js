import {createSlice} from "@reduxjs/toolkit";

export const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        brands: [], 
        list: 0,
        formValue : {
            name: ""
        }
    },
    reducers: {
        setBrands: (state, action) => {
            state.brands = action.payload
        },
        setTotal: (state, action) => {
            state.list = action.payload
        },
        setFormValue: (state, action) => {
            state.formValue[`${action.payload.name}`]=action.payload.value 
        },
        resetFormValue: (state, action)=>{
            Object.keys(state.formValue).forEach((key) => {
                state.formValue[key] = "";
            });
        }

    }
})

export const {setBrands, setTotal, setFormValue, resetFormValue} = brandSlice.actions
export default brandSlice.reducer