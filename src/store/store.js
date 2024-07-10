import { configureStore } from '@reduxjs/toolkit'
import customerSlice from '../slices/customerSlice'
import  supplierSlice  from '../slices/SupplierSlice'
import ExpenseTypeSlice from '../slices/ExpenseTypeSlice'
import ExpenseSlice from '../slices/ExpenseSlice'
import  productSlice  from '../slices/productSlice'


export const store = configureStore({
  reducer: {
    customer: customerSlice,
    supplier : supplierSlice,
    expenseType : ExpenseTypeSlice,
    expense: ExpenseSlice,
    product: productSlice,
  },
})