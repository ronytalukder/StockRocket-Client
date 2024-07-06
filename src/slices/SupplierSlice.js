import { createSlice } from "@reduxjs/toolkit";


export const supplierSlice = createSlice({
    name: "supplier",
    initialState:{
        suppliers:[],
        list :0,

        formValues :{
            supplierName:"",
            phone : '',
            email : '',
            address : '', 
        }

    },

    reducers:{
        setSuppliers: (state, action) => {
            state.suppliers = action.payload;
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

export const {setSuppliers, setList, setFormValues, resetFormValues} = supplierSlice.actions;
export default supplierSlice.reducer