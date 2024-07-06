import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenses: [], 
        list: 0,
        formValue : {
            expenseTypeId: "",
            amount: "",
            description: ""
        },
        expenseTypeDropDown: []
    },
    reducers: {
        setDropDown: (state, action) => {
            state.expenseTypeDropDown = action.payload
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload
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
        },
    }
})
export const { setExpenses, setTotal, setFormValue, resetFormValue, setDropDown } = expenseSlice.actions
export default expenseSlice.reducer