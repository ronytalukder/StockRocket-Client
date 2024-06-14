import { createSlice } from "@reduxjs/toolkit";


export const customerSlice = createSlice({
    name: "customer",

    initialState:{
        customers:[],
        list :0,

        formValues :{
            customerName:"",
            phone : '',
            email : '',
            address : '', 
        }

    },


    reducers:{
        setCustomer: (state, action) => {
            state.customers = action.payload;
        },
        setList :(state, action) =>{
            state.list = action.payload;
        },
        setFormValues :(state, action) =>{
            const {name, value} = action.payload;
            state.formValues[name] = value
        },
        resetFormValues :(state) =>{
            Object.keys(state.formValues).forEach(key => {
                state.formValues[key] = ''
            })
        }  
    }

})

export const {setCustomer, setList, setFormValues, resetFormValues} = customerSlice.actions;
export default customerSlice.reducer

