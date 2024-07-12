import { configureStore } from '@reduxjs/toolkit'
import customerSlice from '../slices/customerSlice'
import  supplierSlice  from '../slices/SupplierSlice'
import ExpenseTypeSlice from '../slices/ExpenseTypeSlice'
import ExpenseSlice from '../slices/ExpenseSlice'
import  productSlice  from '../slices/productSlice'
import brandSlice from '../slices/brandSlice'
import categorySlice from '../slices/categorySlice'
import purchaseSlice from '../slices/purchaseSlice'


export const store = configureStore({
  reducer: {
    customer: customerSlice,
    supplier : supplierSlice,
    expenseType : ExpenseTypeSlice,
    expense: ExpenseSlice,
    brand: brandSlice,
    category: categorySlice,
    product: productSlice,
    purchase: purchaseSlice,
  },
})