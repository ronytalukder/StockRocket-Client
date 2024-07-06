import { createSlice } from "@reduxjs/toolkit";

export const expenseTypeSlice = createSlice({
    name: 'expenseType',
    initialState: {
        expenseTypes: [], 
        list: 0,
        formValue : {
            name: ""
        }
    },
    reducers: {
        setExpenseTypeList : (state, action) => {
            state.expenseTypes = action.payload
        },
        setTotal : (state, action) => {
            state.list = action.payload
        },
        setFormValue : (state, action) => {
            state.formValue[`${action.payload.name}`] = action.payload.value
        },
        resetFormValue : (state, action) => {
            Object.keys(state.formValue).forEach((key) => {
                state.formValue[key] = ""
            })
        }
    },
})

export const { setExpenseTypeList, setTotal, setFormValue, resetFormValue } = expenseTypeSlice.actions
export default expenseTypeSlice.reducer
